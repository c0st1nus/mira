"use client";

import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  MessageCircle,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTelegramLogin } from "@/hooks/use-telegram-login";
import { getTelegramSettings, verifySubscription } from "@/lib/telegram-api";
import type {
  ApiErrorBody,
  TelegramAuthPayload,
  TelegramSettingsResponse,
  TelegramSubscriptionResponse,
} from "@/lib/telegram-types";
import { cn } from "@/lib/utils";
import { useTelegram } from "./telegram-provider";

type SubscriptionStatus =
  | "idle"
  | "checking"
  | "subscribed"
  | "not_subscribed"
  | "error";

export type TelegramSubscriptionModalContent = {
  subscriptionModalTitle: string;
  subscriptionModalDescription: string;
  subscriptionModalOpenChannel: string;
  subscriptionModalLogin: string;
  subscriptionModalPreparingLogin: string;
  subscriptionModalBrowserHint: string;
  subscriptionModalChecking: string;
  subscriptionModalVerified: string;
  subscriptionModalNotSubscribed: string;
  subscriptionModalRetry: string;
  subscriptionModalLoginUnavailable: string;
  subscriptionModalSettingsError: string;
  subscriptionModalAuthError: string;
  subscriptionModalGenericError: string;
  subscriptionModalCloseLabel: string;
};

type TelegramSubscriptionModalProps = {
  content: TelegramSubscriptionModalContent;
  open: boolean;
  onClose: () => void;
  onVerified: (auth: TelegramAuthPayload) => void;
};

export function TelegramSubscriptionModal({
  content,
  open,
  onClose,
  onVerified,
}: TelegramSubscriptionModalProps) {
  const { initData, isTma, openChannel } = useTelegram();
  const [settings, setSettings] = useState<TelegramSettingsResponse | null>(
    null,
  );
  const [isSettingsLoading, setIsSettingsLoading] = useState(false);
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const [status, setStatus] = useState<SubscriptionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    let cancelled = false;

    setStatus("idle");
    setSettings(null);
    setErrorMessage(null);
    setSettingsError(null);
    setIsSettingsLoading(true);

    getTelegramSettings()
      .then(({ data, response }) => {
        if (cancelled) {
          return;
        }

        if (!response.ok || !isTelegramSettingsResponse(data)) {
          throw new Error(
            getApiErrorMessage(data, content.subscriptionModalSettingsError),
          );
        }

        setSettings(data);
      })
      .catch((error) => {
        if (!cancelled) {
          setSettingsError(
            error instanceof Error
              ? error.message
              : content.subscriptionModalSettingsError,
          );
          setSettings(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsSettingsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [content.subscriptionModalSettingsError, open]);

  const handleVerify = useCallback(
    async (auth: TelegramAuthPayload) => {
      if (!auth.value.trim()) {
        setStatus("error");
        setErrorMessage(content.subscriptionModalAuthError);
        return;
      }

      setStatus("checking");
      setErrorMessage(null);

      try {
        const { data, response } = await verifySubscription(auth);

        if (!response.ok || !isTelegramSubscriptionResponse(data)) {
          throw new Error(
            getApiErrorMessage(data, content.subscriptionModalGenericError),
          );
        }

        if (data.subscribed) {
          setStatus("subscribed");
          onVerified(auth);
          return;
        }

        setStatus("not_subscribed");
      } catch (error) {
        setStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : content.subscriptionModalGenericError,
        );
      }
    },
    [
      content.subscriptionModalAuthError,
      content.subscriptionModalGenericError,
      onVerified,
    ],
  );

  useEffect(() => {
    if (open && isTma && initData && status === "idle") {
      void handleVerify({ auth_type: "init_data", value: initData });
    }
  }, [handleVerify, initData, isTma, open, status]);

  if (!open) {
    return null;
  }

  const channelUrl = settings?.channel_url ?? "https://t.me/+MhQzTZsn9ttiNzJi";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div
        aria-modal="true"
        aria-labelledby="telegram-subscription-title"
        className="relative w-full max-w-md space-y-5 rounded-[2rem] border border-border bg-card p-5 text-card-foreground shadow-2xl sm:p-6"
        role="dialog"
      >
        <button
          aria-label={content.subscriptionModalCloseLabel}
          className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          type="button"
          onClick={onClose}
        >
          <X aria-hidden="true" className="size-5" />
        </button>

        <div className="flex items-start gap-3 pr-10">
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MessageCircle aria-hidden="true" className="size-5" />
          </div>
          <div>
            <h3
              id="telegram-subscription-title"
              className="font-heading text-xl font-extrabold tracking-tight text-foreground"
            >
              {content.subscriptionModalTitle}
            </h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {content.subscriptionModalDescription}
            </p>
          </div>
        </div>

        {isTma ? (
          <TmaFlow
            channelUrl={channelUrl}
            content={content}
            errorMessage={errorMessage}
            handleVerify={handleVerify}
            openChannel={openChannel}
            status={status}
          />
        ) : (
          <BrowserFlow
            channelUrl={channelUrl}
            clientId={
              isSettingsLoading ? undefined : (settings?.client_id ?? null)
            }
            content={content}
            errorMessage={errorMessage ?? settingsError}
            handleVerify={handleVerify}
            isSettingsLoading={isSettingsLoading}
            status={status}
          />
        )}
      </div>
    </div>
  );
}

function TmaFlow({
  channelUrl,
  content,
  errorMessage,
  handleVerify,
  openChannel,
  status,
}: {
  channelUrl: string;
  content: TelegramSubscriptionModalContent;
  errorMessage: string | null;
  handleVerify: (auth: TelegramAuthPayload) => Promise<void>;
  openChannel: (url: string) => void;
  status: SubscriptionStatus;
}) {
  const isChecking = status === "checking";

  return (
    <div className="space-y-4">
      <button
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-primary/25 bg-primary/10 px-4 text-sm font-bold text-primary transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
        disabled={isChecking}
        type="button"
        onClick={() => openChannel(channelUrl)}
      >
        <MessageCircle aria-hidden="true" className="size-4" />
        {content.subscriptionModalOpenChannel}
      </button>

      <SubscriptionStatusMessage
        content={content}
        errorMessage={errorMessage}
        status={status}
      />

      {(status === "not_subscribed" || status === "error") && (
        <button
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 text-sm font-bold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
          disabled={isChecking}
          type="button"
          onClick={() => {
            void handleVerify({
              auth_type: "init_data",
              value: window.Telegram?.WebApp?.initData ?? "",
            });
          }}
        >
          <CheckCircle2 aria-hidden="true" className="size-4" />
          {content.subscriptionModalRetry}
        </button>
      )}
    </div>
  );
}

function BrowserFlow({
  channelUrl,
  clientId,
  content,
  errorMessage,
  handleVerify,
  isSettingsLoading,
  status,
}: {
  channelUrl: string;
  clientId: string | null | undefined;
  content: TelegramSubscriptionModalContent;
  errorMessage: string | null;
  handleVerify: (auth: TelegramAuthPayload) => Promise<void>;
  isSettingsLoading: boolean;
  status: SubscriptionStatus;
}) {
  const [sdkState, setSdkState] = useState<"loading" | "ready" | "timeout">(
    "loading",
  );
  const { login, ready } = useTelegramLogin(clientId, {
    onError: () => setSdkState("timeout"),
    onSuccess: (idToken) => {
      void handleVerify({ auth_type: "id_token", value: idToken });
    },
  });

  useEffect(() => {
    if (isSettingsLoading) {
      setSdkState("loading");
      return;
    }

    if (ready) {
      setSdkState("ready");
      return;
    }

    const timer = window.setTimeout(() => {
      setSdkState((previous) =>
        previous === "loading" ? "timeout" : previous,
      );
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [isSettingsLoading, ready]);

  if (isSettingsLoading) {
    return (
      <InlineStatus
        icon="loader"
        text={content.subscriptionModalPreparingLogin}
      />
    );
  }

  if (!clientId) {
    return (
      <div className="space-y-3">
        <InlineStatus
          icon="error"
          text={errorMessage ?? content.subscriptionModalLoginUnavailable}
          tone="destructive"
        />
        <OpenChannelLink content={content} href={channelUrl} />
      </div>
    );
  }

  const canLogin = ready && Boolean(clientId);

  return (
    <div className="space-y-4">
      <OpenChannelLink content={content} href={channelUrl} />

      <button
        className={cn(
          "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70",
          !canLogin && "cursor-not-allowed",
        )}
        disabled={!canLogin || status === "checking"}
        type="button"
        onClick={login}
      >
        <MessageCircle aria-hidden="true" className="size-4" />
        {content.subscriptionModalLogin}
      </button>

      {sdkState === "loading" && !ready && (
        <InlineStatus
          icon="loader"
          text={content.subscriptionModalPreparingLogin}
        />
      )}

      {sdkState === "timeout" && (
        <InlineStatus
          icon="error"
          text={content.subscriptionModalLoginUnavailable}
          tone="warning"
        />
      )}

      <p className="text-center text-xs leading-5 text-muted-foreground">
        {content.subscriptionModalBrowserHint}
      </p>

      <SubscriptionStatusMessage
        content={content}
        errorMessage={errorMessage}
        status={status}
      />
    </div>
  );
}

function SubscriptionStatusMessage({
  content,
  errorMessage,
  status,
}: {
  content: TelegramSubscriptionModalContent;
  errorMessage: string | null;
  status: SubscriptionStatus;
}) {
  if (status === "checking") {
    return (
      <InlineStatus icon="loader" text={content.subscriptionModalChecking} />
    );
  }

  if (status === "subscribed") {
    return (
      <InlineStatus
        icon="success"
        text={content.subscriptionModalVerified}
        tone="success"
      />
    );
  }

  if (status === "not_subscribed") {
    return (
      <InlineStatus
        icon="error"
        text={content.subscriptionModalNotSubscribed}
        tone="destructive"
      />
    );
  }

  if (status === "error") {
    return (
      <InlineStatus
        icon="error"
        text={errorMessage ?? content.subscriptionModalGenericError}
        tone="destructive"
      />
    );
  }

  return null;
}

function InlineStatus({
  icon,
  text,
  tone = "default",
}: {
  icon: "error" | "loader" | "success";
  text: string;
  tone?: "default" | "destructive" | "success" | "warning";
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-2xl border p-4 text-sm leading-6",
        tone === "default" && "border-border bg-muted/50 text-muted-foreground",
        tone === "destructive" &&
          "border-destructive/25 bg-destructive/10 text-destructive",
        tone === "success" && "border-primary/25 bg-primary/10 text-primary",
        tone === "warning" &&
          "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-200",
      )}
    >
      {icon === "loader" && (
        <Loader2
          aria-hidden="true"
          className="mt-1 size-4 shrink-0 motion-safe:animate-spin"
        />
      )}
      {icon === "error" && (
        <AlertCircle aria-hidden="true" className="mt-1 size-4 shrink-0" />
      )}
      {icon === "success" && (
        <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0" />
      )}
      <span>{text}</span>
    </div>
  );
}

function OpenChannelLink({
  content,
  href,
}: {
  content: TelegramSubscriptionModalContent;
  href: string;
}) {
  return (
    <a
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-primary/25 bg-primary/10 px-4 text-sm font-bold text-primary transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <MessageCircle aria-hidden="true" className="size-4" />
      {content.subscriptionModalOpenChannel}
    </a>
  );
}

function isTelegramSettingsResponse(
  data: ApiErrorBody | TelegramSettingsResponse | null,
): data is TelegramSettingsResponse {
  return Boolean(
    data &&
      "channel_url" in data &&
      typeof data.channel_url === "string" &&
      "client_id" in data,
  );
}

function isTelegramSubscriptionResponse(
  data: ApiErrorBody | TelegramSubscriptionResponse | null,
): data is TelegramSubscriptionResponse {
  return Boolean(
    data && "subscribed" in data && typeof data.subscribed === "boolean",
  );
}

function getApiErrorMessage(data: unknown, fallback: string) {
  if (
    data &&
    typeof data === "object" &&
    "message" in data &&
    typeof data.message === "string" &&
    data.message.trim().length > 0
  ) {
    return data.message;
  }

  return fallback;
}
