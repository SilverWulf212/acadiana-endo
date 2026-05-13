import {
  LOCATION_LAFAYETTE,
  LOCATION_NEW_IBERIA,
} from "@/app/lib/constants";
import LocationCard from "@/app/components/LocationCard";

type LocationsBlockProps = {
  eyebrow?: string;
  heading?: string;
  showMaps?: boolean;
};

/**
 * Composes the two practice location cards.
 * Server Component. Each card is wrapped in a stagger shell so LocationCard's
 * own API surface stays untouched.
 */
export default function LocationsBlock({
  eyebrow,
  heading,
  showMaps = false,
}: LocationsBlockProps) {
  const locations = [LOCATION_LAFAYETTE, LOCATION_NEW_IBERIA];

  return (
    <section className="section">
      <div className="container">
        {(eyebrow || heading) && (
          <div className="mb-10 text-center sm:mb-14">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {heading && (
              <h2 className="heading-section mt-3">{heading}</h2>
            )}
            {heading && <div className="accent-bar mx-auto mt-4" />}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {locations.map((loc, idx) => (
            <div
              key={loc.name}
              className="animate-fade-up"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <LocationCard location={loc} showMap={showMaps} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
