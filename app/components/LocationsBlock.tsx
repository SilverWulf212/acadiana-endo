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
 * Server Component.
 */
export default function LocationsBlock({
  eyebrow,
  heading,
  showMaps = false,
}: LocationsBlockProps) {
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
          <LocationCard location={LOCATION_LAFAYETTE} showMap={showMaps} />
          <LocationCard location={LOCATION_NEW_IBERIA} showMap={showMaps} />
        </div>
      </div>
    </section>
  );
}
