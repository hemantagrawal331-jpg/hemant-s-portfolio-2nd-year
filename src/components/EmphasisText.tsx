export function EmphasisText({
  text,
  strongClassName = "font-medium text-fg",
}: Readonly<{
  text: string;
  strongClassName?: string;
}>) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={part} className={strongClassName}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
