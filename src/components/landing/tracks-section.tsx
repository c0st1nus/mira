import type { LandingContent } from "@/lib/landing-content";
import { Section } from "./section";
import { TrackCard } from "./track-card";

type TracksSectionProps = {
  content: LandingContent;
};

export function TracksSection({ content }: TracksSectionProps) {
  return (
    <Section
      id="tracks"
      eyebrow={content.tracks.eyebrow}
      title={content.tracks.title}
      description={content.tracks.description}
      className="bg-secondary/45"
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {content.tracks.items.map((track, index) => (
          <TrackCard
            key={track.title}
            {...track}
            closeLabel={content.tracks.close}
            index={index}
            mechanicLabel={content.tracks.mechanic}
            srLabel={content.tracks.sr}
          />
        ))}
      </div>
    </Section>
  );
}
