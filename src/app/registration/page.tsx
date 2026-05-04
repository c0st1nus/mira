import { Suspense } from "react";
import { RegistrationPageShell } from "@/components/landing/registration-page-shell";
import { RouteShellFallback } from "@/components/landing/route-shell-fallback";
import type { Language } from "@/lib/landing-content";
import { parseLanguageParam } from "@/lib/language-routing";

async function RegistrationFromSearchParams({
  language,
}: {
  language: Promise<Language>;
}) {
  return <RegistrationPageShell language={await language} />;
}

export default function RegistrationPage({
  searchParams,
}: {
  searchParams: Promise<{ language?: string | string[] }>;
}) {
  const language = searchParams.then((params) =>
    parseLanguageParam(params.language),
  );

  return (
    <Suspense fallback={<RouteShellFallback />}>
      <RegistrationFromSearchParams language={language} />
    </Suspense>
  );
}
