"use server";

import { appendRegistrationToSheet } from "@/lib/google-sheets";
import {
  getRegistrationLanguage,
  getRegistrationMessages,
  type RegistrationActionState,
  registrationPayloadToSheetRow,
  validateRegistrationForm,
} from "@/lib/registration";
import {
  isTelegramSubscriptionRequired,
  readTelegramAuthFromFormData,
  verifyTelegramSubscription,
} from "@/lib/telegram";

export async function submitRegistration(
  _prevState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  const language = getRegistrationLanguage(formData);
  const messages = getRegistrationMessages(language);
  const requireSubscription = isTelegramSubscriptionRequired();
  const parsed = validateRegistrationForm(formData, language, {
    requireSubscription,
  });

  if (!parsed.ok) {
    return {
      status: "error",
      message: messages.submitError,
      errors: parsed.errors,
      values: parsed.values,
    };
  }

  if (requireSubscription) {
    const telegramAuth = readTelegramAuthFromFormData(formData);

    if (!telegramAuth) {
      return {
        status: "error",
        message: messages.submitError,
        errors: {
          subscribed: messages.subscriptionNotVerified,
        },
        values: parsed.values,
      };
    }

    try {
      const subscription = await verifyTelegramSubscription(telegramAuth);

      if (!subscription.subscribed) {
        return {
          status: "error",
          message: messages.submitError,
          errors: {
            subscribed: messages.subscriptionNotVerified,
          },
          values: parsed.values,
        };
      }
    } catch (error) {
      console.error(error);

      return {
        status: "error",
        message: messages.submitError,
        errors: {
          subscribed: messages.subscriptionCheckFailed,
        },
        values: parsed.values,
      };
    }
  }

  try {
    await appendRegistrationToSheet(
      registrationPayloadToSheetRow(parsed.payload),
    );

    return {
      status: "success",
      message: messages.success,
      errors: {},
      values: {},
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message: messages.saveError,
      errors: {
        form: messages.saveErrorHint,
      },
      values: parsed.values,
    };
  }
}
