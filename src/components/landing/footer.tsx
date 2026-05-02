import type { LandingContent } from "@/lib/landing-content";

type FooterProps = {
  content: LandingContent;
};

export function Footer({ content }: FooterProps) {
  return (
    <footer className="border-t border-border px-4 pb-28 pt-10 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-lg font-extrabold tracking-[-0.04em] text-foreground">
            Mira Growth Hack
          </p>
          <p className="mt-1">{content.footer}</p>
        </div>
      </div>
    </footer>
  );
}
