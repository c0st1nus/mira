import { BriefcaseBusiness, Camera, Globe, Mail, Send } from "lucide-react";
import type { LandingContent } from "@/lib/landing-content";

type FooterProps = {
  content: LandingContent;
};

const footerSocials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/decentrathon/",
    icon: Camera,
  },
  { name: "Telegram", href: "https://t.me/+uwG_E1MZj31hOTAy", icon: Send },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/centerofblockchain/",
    icon: BriefcaseBusiness,
  },
  { name: "BAITC", href: "https://baitc.org", icon: Globe },
];

const footerEmail = "team@baitc.org";
const copyrightYear = 2026;

export function Footer({ content }: FooterProps) {
  return (
    <footer className="border-t border-border/70 px-4 pb-28 pt-12 sm:px-6 sm:pb-12 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
          <div className="max-w-2xl">
            <p className="font-heading text-2xl font-extrabold tracking-[-0.05em] text-foreground">
              Mira Growth Hack
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              {content.footer.description}
            </p>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <div className="flex flex-col gap-2 md:items-end">
              <span className="font-mono text-base font-semibold uppercase tracking-[0.14em] text-primary sm:text-lg">
                {content.footer.reachOut}
              </span>
              <a
                href={`mailto:${footerEmail}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full text-xl font-bold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-2xl"
              >
                <Mail aria-hidden="true" className="size-5 text-primary" />
                {footerEmail}
              </a>
            </div>

            <div className="flex items-center gap-3">
              {footerSocials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Icon aria-hidden="true" className="size-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/70 pt-6 text-xs font-semibold text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © 2023-{copyrightYear} Decentrathon. {content.footer.rights}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span>{content.footer.poweredBy}</span>
            <a
              href="https://t.me/c0st1nus"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              c0st1nus
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
