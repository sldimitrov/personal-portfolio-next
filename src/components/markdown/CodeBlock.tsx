import CopyButton from "@/components/markdown/CopyButton";
import { highlight, languageLabel } from "@/lib/highlight";

export default async function CodeBlock({
  code,
  lang,
}: {
  code: string;
  lang: string | null;
}) {
  const html = await highlight(code, lang);
  const label = languageLabel(lang);

  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-line bg-navy-50 shadow-sm">
      <figcaption className="flex items-center justify-between gap-4 border-b border-line bg-white/60 px-4 py-1.5">
        <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted">
          {label ?? "Code"}
        </span>
        <CopyButton value={code} />
      </figcaption>
      <div
        className="[&_pre]:!bg-transparent [&_pre]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
