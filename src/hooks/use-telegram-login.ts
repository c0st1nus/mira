"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TELEGRAM_LOGIN_SCRIPT = "https://telegram.org/js/telegram-login.js";

type TelegramLoginCallbacks = {
  onSuccess?: (idToken: string) => void;
  onError?: (error: string) => void;
};

export function useTelegramLogin(
  clientId: string | null | undefined,
  callbacks?: TelegramLoginCallbacks,
) {
  const [ready, setReady] = useState(false);
  const callbacksRef = useRef(callbacks);
  callbacksRef.current = callbacks;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.Telegram?.Login) {
      setReady(true);
      return;
    }

    const existing = document.querySelector(
      `script[src="${TELEGRAM_LOGIN_SCRIPT}"]`,
    );
    if (existing) {
      const check = () => {
        if (window.Telegram?.Login) {
          setReady(true);
          return;
        }

        window.setTimeout(check, 100);
      };

      check();
      return;
    }

    const script = document.createElement("script");
    script.src = TELEGRAM_LOGIN_SCRIPT;
    script.async = true;
    script.onload = () => {
      if (window.Telegram?.Login) {
        setReady(true);
      }
    };
    script.onerror = () => {
      callbacksRef.current?.onError?.("failed_to_load_telegram_login_sdk");
    };
    document.body.appendChild(script);
  }, []);

  const login = useCallback(() => {
    if (!window.Telegram?.Login || !clientId) {
      callbacksRef.current?.onError?.("telegram_login_unavailable");
      return;
    }

    const clientIdNumber = Number(clientId);
    if (!Number.isFinite(clientIdNumber)) {
      callbacksRef.current?.onError?.("invalid_telegram_client_id");
      return;
    }

    window.Telegram.Login.auth(
      {
        client_id: clientIdNumber,
        request_access: ["write"],
      },
      (result) => {
        if (result.error) {
          callbacksRef.current?.onError?.(result.error);
          return;
        }

        if (result.id_token) {
          callbacksRef.current?.onSuccess?.(result.id_token);
          return;
        }

        callbacksRef.current?.onError?.("unexpected_telegram_login_response");
      },
    );
  }, [clientId]);

  return { ready, login };
}
