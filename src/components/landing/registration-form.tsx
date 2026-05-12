"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  useActionState,
  useEffect,
  useState,
} from "react";
import { submitRegistration } from "@/app/actions";
import { TelegramSubscriptionModal } from "@/components/telegram-subscription-modal";
import { communityHref, type Language } from "@/lib/landing-content";
import {
  getRequiredTeammateCount,
  initialRegistrationState,
  type RegistrationErrors,
  type RegistrationFieldName,
} from "@/lib/registration";
import type { RegistrationContent } from "@/lib/registration-content";
import type { TelegramAuthPayload } from "@/lib/telegram-types";
import { cn } from "@/lib/utils";

type RegistrationFormContent = RegistrationContent["form"];
type Option = { value: string; label: string };

function getError(errors: RegistrationErrors, name: RegistrationFieldName) {
  return errors[name];
}

const inputClassName =
  "min-h-12 w-full rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-invalid:border-destructive aria-invalid:ring-destructive/20";

const communityLinkClassName =
  "font-bold text-primary underline underline-offset-4 transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const communityLinkPhrases = [
  "Telegram-канал Decentrathon-а",
  "Telegram-канал Decentrathon",
  "Decentrathon Telegram-каналына",
  "Decentrathon Telegram channel",
  "Telegram-сообществе",
  "Telegram-сообщество",
  "Telegram-комьюнитиде",
  "Telegram-комьюнитиге",
  "Telegram community",
  "Telegram channel",
  "Telegram-канал",
];

function renderCommunityLinkedText(text: string) {
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining) {
    const match = communityLinkPhrases
      .map((phrase) => ({ phrase, index: remaining.indexOf(phrase) }))
      .filter((item) => item.index >= 0)
      .sort(
        (a, b) => a.index - b.index || b.phrase.length - a.phrase.length,
      )[0];

    if (!match) {
      parts.push(remaining);
      break;
    }

    if (match.index > 0) {
      parts.push(remaining.slice(0, match.index));
    }

    parts.push(
      <a
        key={`${match.phrase}-${key}`}
        href={communityHref}
        target="_blank"
        rel="noopener noreferrer"
        className={communityLinkClassName}
      >
        {match.phrase}
      </a>,
    );
    remaining = remaining.slice(match.index + match.phrase.length);
    key += 1;
  }

  return parts;
}

type FieldProps = {
  name: RegistrationFieldName;
  label: string;
  required?: boolean;
  hint?: string;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text";
  spellCheck?: boolean;
  errors: RegistrationErrors;
  defaultValue?: string;
};

function TextField({
  name,
  label,
  required,
  hint,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  spellCheck,
  errors,
  defaultValue,
}: FieldProps) {
  const error = getError(errors, name);
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-bold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        spellCheck={spellCheck}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={cn(hintId, errorId) || undefined}
        className={inputClassName}
      />
      {hint && (
        <p id={hintId} className="text-sm leading-6 text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

type SelectFieldProps = {
  name: RegistrationFieldName;
  label: string;
  options: readonly Option[];
  placeholder: string;
  errors: RegistrationErrors;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

function SelectField({
  name,
  label,
  options,
  placeholder,
  errors,
  defaultValue,
  onChange,
}: SelectFieldProps) {
  const error = getError(errors, name);

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-bold text-foreground">
        {label} <span className="text-destructive">*</span>
      </label>
      <select
        id={name}
        name={name}
        required
        defaultValue={defaultValue || ""}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClassName}
        onChange={(event) => onChange?.(event.target.value)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p
          id={`${name}-error`}
          className="text-sm font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}

type RadioGroupProps = {
  name: RegistrationFieldName;
  legend: string;
  options: readonly Option[];
  errors: RegistrationErrors;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

function RadioGroup({
  name,
  legend,
  options,
  errors,
  defaultValue,
  onChange,
}: RadioGroupProps) {
  const error = getError(errors, name);

  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="text-sm font-bold text-foreground">
        {legend} <span className="text-destructive">*</span>
      </legend>
      <div className="mt-3 grid gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="group relative block cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              required
              defaultChecked={defaultValue === option.value}
              className="peer sr-only"
              onChange={(event) => onChange?.(event.target.value)}
            />
            <span className="flex min-h-12 items-center rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors group-hover:bg-accent peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p
          id={`${name}-error`}
          className="mt-2 text-sm font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </fieldset>
  );
}

type TeammateFieldsProps = {
  index: 1 | 2 | 3;
  content: RegistrationFormContent;
  errors: RegistrationErrors;
  values: Record<string, string | undefined>;
};

function TeammateFields({
  index,
  content,
  errors,
  values,
}: TeammateFieldsProps) {
  const nameField = `teammate${index}Name` as RegistrationFieldName;
  const emailField = `teammate${index}Email` as RegistrationFieldName;
  const telegramName = `teammate${index}Telegram` as RegistrationFieldName;

  return (
    <div className="rounded-[1.5rem] border border-border bg-background/80 p-4 sm:p-5">
      <h4 className="font-heading text-xl font-extrabold tracking-[-0.04em] text-foreground">
        {content.teammateTitlePrefix}
        {index}
        {content.teammateTitleSuffix}
      </h4>
      <div className="mt-4 grid gap-4">
        <TextField
          name={nameField}
          label={content.teammateNameLabel}
          required
          hint={content.teammateNameHint}
          placeholder={content.teammateNamePlaceholder}
          autoComplete="name"
          errors={errors}
          defaultValue={values[nameField]}
        />
        <TextField
          name={emailField}
          label={content.teammateEmailLabel}
          required
          type="email"
          inputMode="email"
          hint={content.teammateEmailHint}
          placeholder={content.teammateEmailPlaceholder}
          autoComplete="email"
          spellCheck={false}
          errors={errors}
          defaultValue={values[emailField]}
        />
        <TextField
          name={telegramName}
          label={content.teammateTelegramLabel}
          required
          hint={content.teammateTelegramHint}
          placeholder={content.teammateTelegramPlaceholder}
          autoComplete="off"
          spellCheck={false}
          errors={errors}
          defaultValue={values[telegramName]}
        />
      </div>
    </div>
  );
}

export function RegistrationForm({
  content,
  language,
}: {
  content: RegistrationFormContent;
  language: Language;
}) {
  const [state, formAction, pending] = useActionState(
    submitRegistration,
    initialRegistrationState,
  );
  const [teamSize, setTeamSize] = useState(state.values.teamSize || "");
  const [country, setCountry] = useState(state.values.country || "");
  const [city, setCity] = useState(state.values.city || "");
  const [status, setStatus] = useState(state.values.status || "");
  const [telegramAuth, setTelegramAuth] = useState<TelegramAuthPayload | null>(
    null,
  );
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [subscriptionTouched, setSubscriptionTouched] = useState(false);
  const teammateCount = getRequiredTeammateCount(teamSize);
  const isKazakhstanSelected = country === "Казахстан";
  const isNonKazakhstanCountrySelected =
    Boolean(country) && !isKazakhstanSelected;
  const isSubscriptionVerified = Boolean(telegramAuth);
  const subscriptionError =
    state.errors.subscribed ||
    (!isSubscriptionVerified && subscriptionTouched
      ? content.subscriptionRequiredError
      : undefined);

  function handleCountryChange(value: string) {
    setCountry(value);
    setCity("");
  }

  function handleSubscriptionChange(event: ChangeEvent<HTMLInputElement>) {
    if (isSubscriptionVerified && !event.currentTarget.checked) {
      setTelegramAuth(null);
      setSubscriptionTouched(true);
      return;
    }

    setShowSubscriptionModal(true);
  }

  function handleSubscriptionVerified(auth: TelegramAuthPayload) {
    setTelegramAuth(auth);
    setSubscriptionTouched(false);
    setShowSubscriptionModal(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (isSubscriptionVerified) {
      return;
    }

    event.preventDefault();
    setSubscriptionTouched(true);
    setShowSubscriptionModal(true);
  }

  useEffect(() => {
    if (state.status !== "error") {
      return;
    }

    const invalidField = document.querySelector<HTMLElement>(
      "[aria-invalid='true']",
    );
    invalidField?.focus();
  }, [state]);

  useEffect(() => {
    if (!state.errors.subscribed) {
      return;
    }

    setTelegramAuth(null);
    setSubscriptionTouched(true);
  }, [state.errors.subscribed]);

  if (state.status === "success") {
    return (
      <div className="rounded-[2rem] border border-primary/20 bg-primary/10 p-6 text-center sm:p-8">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CheckCircle2 aria-hidden="true" className="size-7" />
        </div>
        <h3 className="mt-5 font-heading text-3xl font-extrabold tracking-tighter text-foreground">
          {content.successTitle}
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-muted-foreground">
          {renderCommunityLinkedText(state.message)}{" "}
          {renderCommunityLinkedText(content.successText)}
        </p>
        <a
          href={communityHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {content.successCta}
        </a>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      aria-busy={pending}
      className="space-y-8"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="language" value={language} />
      {telegramAuth && (
        <>
          <input type="hidden" name="subscribed" value="yes" />
          <input
            type="hidden"
            name="telegramAuthType"
            value={telegramAuth.auth_type}
          />
          <input
            type="hidden"
            name="telegramAuthValue"
            value={telegramAuth.value}
          />
        </>
      )}
      {state.message && (
        <div className="rounded-[1.5rem] border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          <div className="flex items-start gap-3">
            <AlertCircle
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0"
            />
            <div>
              <p className="font-bold">
                {renderCommunityLinkedText(state.message)}
              </p>
              {state.errors.form && (
                <p className="mt-1 text-destructive/90">
                  {renderCommunityLinkedText(state.errors.form)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-5">
        <TextField
          name="email"
          label={content.emailLabel}
          required
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          spellCheck={false}
          errors={state.errors}
          defaultValue={state.values.email}
        />
        <TextField
          name="fullName"
          label={content.fullNameLabel}
          required
          autoComplete="name"
          placeholder="Камила Сакенова"
          errors={state.errors}
          defaultValue={state.values.fullName}
        />
        <TextField
          name="phone"
          label={content.phoneLabel}
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 707 123 12 23"
          spellCheck={false}
          errors={state.errors}
          defaultValue={state.values.phone}
        />
        <TextField
          name="telegram"
          label={content.telegramLabel}
          required
          placeholder="@sammExe"
          autoComplete="off"
          spellCheck={false}
          errors={state.errors}
          defaultValue={state.values.telegram}
        />
      </div>

      <div className="grid gap-5">
        <SelectField
          name="country"
          label={content.countryLabel}
          options={content.options.country}
          placeholder={content.selectPlaceholder}
          errors={state.errors}
          defaultValue={state.values.country}
          onChange={handleCountryChange}
        />
        {country === "Другое" && (
          <TextField
            name="countryOther"
            label={content.countryOtherLabel}
            required
            autoComplete="country-name"
            errors={state.errors}
            defaultValue={state.values.countryOther}
          />
        )}
        {(country === "" || isKazakhstanSelected) && (
          <SelectField
            name="city"
            label={content.cityLabel}
            options={content.options.city}
            placeholder={content.selectPlaceholder}
            errors={state.errors}
            defaultValue={state.values.city}
            onChange={setCity}
          />
        )}
        {(isNonKazakhstanCountrySelected || city === "Другое") && (
          <>
            {isNonKazakhstanCountrySelected && (
              <input type="hidden" name="city" value="Другое" />
            )}
            <TextField
              name="cityOther"
              label={content.cityOtherLabel}
              required
              autoComplete="address-level2"
              errors={state.errors}
              defaultValue={state.values.cityOther}
            />
          </>
        )}
      </div>

      <div className="grid gap-6">
        <RadioGroup
          name="teamSize"
          legend={content.teamSizeLegend}
          options={content.options.teamSize}
          errors={state.errors}
          defaultValue={state.values.teamSize}
          onChange={setTeamSize}
        />
        <RadioGroup
          name="status"
          legend={content.statusLegend}
          options={content.options.status}
          errors={state.errors}
          defaultValue={state.values.status}
          onChange={setStatus}
        />
      </div>

      <div className="grid gap-5">
        <TextField
          name="teamName"
          label={content.teamNameLabel}
          required
          hint={content.teamNameHint}
          placeholder="Mira Makers"
          autoComplete="organization"
          errors={state.errors}
          defaultValue={state.values.teamName}
        />
        <TextField
          name="university"
          label={content.universityLabel}
          required={status === "Студент"}
          hint={content.universityHint}
          placeholder="Nazarbayev University"
          autoComplete="organization"
          errors={state.errors}
          defaultValue={state.values.university}
        />
      </div>

      <RadioGroup
        name="experience"
        legend={content.experienceLegend}
        options={content.options.experience}
        errors={state.errors}
        defaultValue={state.values.experience}
      />

      {teammateCount > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-heading text-2xl font-extrabold tracking-tighter text-foreground">
              {content.teammatesTitle}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {content.teammatesHint}
            </p>
          </div>
          {teammateCount >= 1 && (
            <TeammateFields
              index={1}
              content={content}
              errors={state.errors}
              values={state.values}
            />
          )}
          {teammateCount >= 2 && (
            <TeammateFields
              index={2}
              content={content}
              errors={state.errors}
              values={state.values}
            />
          )}
          {teammateCount >= 3 && (
            <TeammateFields
              index={3}
              content={content}
              errors={state.errors}
              values={state.values}
            />
          )}
        </div>
      )}

      <div className="rounded-[1.5rem] border border-border bg-background/80 p-4 sm:p-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={isSubscriptionVerified}
            aria-invalid={subscriptionError ? "true" : undefined}
            aria-describedby={
              subscriptionError ? "subscribed-error" : "subscribed-hint"
            }
            className="mt-1 size-5 rounded border-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onChange={handleSubscriptionChange}
          />
          <span>
            <span className="block text-sm font-bold text-foreground">
              {renderCommunityLinkedText(content.subscribedLabel)}{" "}
              <span className="text-destructive">*</span>
            </span>
            <span
              id="subscribed-hint"
              className="mt-1 block text-sm leading-6 text-muted-foreground"
            >
              {renderCommunityLinkedText(content.subscribedHint)}
              <a
                href={communityHref}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {content.telegramLinkLabel}
              </a>
            </span>
            {isSubscriptionVerified && (
              <span className="mt-2 flex items-center gap-2 text-sm font-bold text-primary">
                <CheckCircle2 aria-hidden="true" className="size-4" />
                {content.subscriptionVerifiedLabel}
              </span>
            )}
          </span>
        </label>
        {subscriptionError && (
          <p
            id="subscribed-error"
            className="mt-2 text-sm font-medium text-destructive"
          >
            {renderCommunityLinkedText(subscriptionError)}
          </p>
        )}
      </div>

      <TelegramSubscriptionModal
        content={content}
        open={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onVerified={handleSubscriptionVerified}
      />

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-base font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 sm:w-auto sm:rounded-full"
      >
        {pending && (
          <Loader2 aria-hidden="true" className="size-5 animate-spin" />
        )}
        {pending ? content.pendingLabel : content.submitLabel}
      </button>
    </form>
  );
}
