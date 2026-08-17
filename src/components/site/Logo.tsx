type LogoProps = {
  className?: string;
  withLabel?: boolean;
};

export function Logo({ className, withLabel = true }: LogoProps) {
  return (
    <span className={`inline-flex flex-col leading-none ${className ?? "text-2xl"}`}>
      {withLabel && (
        <span className="font-mono text-[0.3em] font-medium uppercase tracking-[0.4em] text-ivory/45">
          Barbershop
        </span>
      )}
      <span
        className="bg-clip-text font-display text-[1em] font-extrabold uppercase tracking-[0.04em] text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(100deg, #8A6417 0%, #F3D989 25%, #C9A227 45%, #F3D989 65%, #8A6417 100%)",
        }}
      >
        Senior
      </span>
    </span>
  );
}
