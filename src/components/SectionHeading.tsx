export function SectionHeading({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="label mb-4">{kicker}</p>
      <h2 className="heading text-3xl text-fg sm:text-4xl md:text-5xl lg:text-6xl">{title}</h2>
      {text && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{text}</p>}
    </div>
  );
}
