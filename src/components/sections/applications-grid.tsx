import type { TitledText } from "@/types/content";

/** Numbered grid of applications or capabilities. */
export function ApplicationsGrid({
  items,
  tone = "light",
}: {
  items: TitledText[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <li
          key={item.title}
          data-reveal
          style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
          className={dark ? "border-t border-white/15 pt-6" : "border-t border-steel-300 pt-6"}
        >
          <span
            aria-hidden="true"
            className={
              dark ? "font-mono text-label text-cryo-300" : "font-mono text-label text-blue-600"
            }
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className={dark ? "mt-4 text-xl text-white" : "mt-4 text-xl text-navy-900"}>
            {item.title}
          </h3>
          <p
            className={
              dark
                ? "mt-3 text-[0.9375rem] leading-relaxed text-steel-300"
                : "mt-3 text-[0.9375rem] leading-relaxed text-steel-600"
            }
          >
            {item.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
