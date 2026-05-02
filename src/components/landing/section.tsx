import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "content-section px-4 py-16 sm:px-6 lg:px-8 lg:py-24",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        {(eyebrow || title || description) && (
          <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
            {eyebrow && (
              <p className="mb-4 font-mono text-base font-semibold uppercase tracking-[0.14em] text-primary sm:text-lg">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-heading text-4xl font-extrabold tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
