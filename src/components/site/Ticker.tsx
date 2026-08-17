import { locations } from "@/lib/data/locations";

export function Ticker({ label }: { label: string }) {
  return (
    <div className="overflow-hidden border-y border-ink-line/70 bg-ink-raised py-3">
      <div className="flex w-max animate-ticker gap-10">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-10 pr-10">
            {locations.map((loc, i) => (
              <span
                key={`${copy}-${loc.id}-${i}`}
                className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ivory/50"
              >
                <span className="text-gold">{label}</span>
                <span className="text-ivory/30">·</span>
                <span>{loc.district}</span>
                <span className="text-ivory/30">—</span>
                <span>{loc.address}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
