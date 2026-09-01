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
            "linear-gradient(100deg, #4A525C 0%, #EAEEF1 25%, #8F99A3 45%, #EAEEF1 65%, #4A525C 100%)",
        }}
      >
        Abyroi
      </span>
    </span>
  );
}
