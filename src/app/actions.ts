"use server";

import { appendRegistrationToSheet } from "@/lib/google-sheets";
import {
  getRegistrationLanguage,
  getRegistrationMessages,
  type RegistrationActionState,
  registrationPayloadToSheetRow,
  validateRegistrationForm,
} from "@/lib/registration";

export async function submitRegistration(
  _prevState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  const language = getRegistrationLanguage(formData);
  const messages = getRegistrationMessages(language);
  const parsed = validateRegistrationForm(formData, language);

  if (!parsed.ok) {
    return {
      status: "error",
      message: messages.submitError,
      errors: parsed.errors,
      values: parsed.values,
    };
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
