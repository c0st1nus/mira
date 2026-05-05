import { Suspense } from "react";
import { LandingShell } from "@/components/landing/landing-shell";
import { RouteShellFallback } from "@/components/landing/route-shell-fallback";
import type { Language } from "@/lib/landing-content";
import { parseLanguageParam } from "@/lib/language-routing";

export const dynamic = "force-dynamic";

async function LandingFromSearchParams({
  language,
}: {
  language: Promise<Language>;
}) {
  return <LandingShell language={await language} />;
}

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ language?: string | string[] }>;
}) {
  const language = searchParams.then((params) =>
    parseLanguageParam(params.language),
  );

  return (
    <Suspense fallback={<RouteShellFallback />}>
      <LandingFromSearchParams language={language} />
    </Suspense>
  );
}
