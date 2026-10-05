import type { Element, ElementContent } from "hast";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/markdown/CodeBlock";

/** Flattens a hast subtree back to its raw source text. */
function toText(nodes: ElementContent[] | undefined): string {
  if (!nodes) return "";

  return nodes
    .map((node) => {
      if (node.type === "text") return node.value;
      if (node.type === "element") return toText(node.children);
      return "";
    })
    .join("");
}

function languageOf(node: Element): string | null {
  const classNames = node.properties?.className;

  if (!Array.isArray(classNames)) return null;

  const match = classNames
    .map(String)
    .find((name) => name.startsWith("language-"));

  return match ? match.slice("language-".length) : null;
}

/** Headings get a quiet `#` affordance that appears on hover or focus. */
function HeadingAnchor({ id }: { id?: string }) {
  if (!id) return null;

  return (
    <a
      href={`#${id}`}
      aria-label="Link to this section"
      className="ml-2 align-middle text-navy-300 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
    >
      #
    </a>
  );
}

const components: Components = {
  h1: ({ children, id }) => (
    <h2
      id={id}
      className="group mt-12 mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight text-fg first:mt-0"
    >
      {children}
      <HeadingAnchor id={id} />
    </h2>
  ),
  h2: ({ children, id }) => (
    <h2
      id={id}
      className="group mt-12 mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight text-fg first:mt-0"
    >
      {children}
      <HeadingAnchor id={id} />
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3
      id={id}
      className="group mt-8 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight text-fg"
    >
      {children}
      <HeadingAnchor id={id} />
    </h3>
  ),
  h4: ({ children, id }) => (
    <h4
      id={id}
      className="mt-6 mb-2 scroll-mt-24 text-lg font-semibold text-fg"
    >
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="my-5 leading-7 text-body">{children}</p>
  ),
  a: ({ children, href }) => {
    const isExternal = !!href && /^https?:\/\//.test(href);

    return (
      <a
        href={href}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="font-medium text-navy-600 underline decoration-navy-200 underline-offset-4 transition-colors hover:decoration-navy-500"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="my-5 list-disc space-y-2 pl-6 marker:text-navy-400">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-5 list-decimal space-y-2 pl-6 marker:text-navy-400">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="pl-1 leading-7 text-body">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-fg">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-r-lg border-l-2 border-navy-300 bg-navy-50 py-1 pr-4 pl-5 text-body italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-line" />,
  img: ({ src, alt }) => (
    // Post images are remote and arbitrary, so next/image's domain allowlist
    // does not apply here.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      loading="lazy"
      className="my-6 w-full rounded-xl border border-line"
    />
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-line">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-line-strong bg-navy-50 px-4 py-2.5 text-left font-semibold text-fg">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-line px-4 py-2.5 text-body">{children}</td>
  ),
  code: ({ children }) => (
    <code className="rounded-md border border-line bg-navy-50 px-1.5 py-0.5 font-mono text-[0.875em] text-navy-700">
      {children}
    </code>
  ),
  pre: ({ node, children }) => {
    const codeNode = node?.children.find(
      (child): child is Element =>
        child.type === "element" && child.tagName === "code"
    );

    if (!codeNode) {
      return <pre>{children}</pre>;
    }

    return (
      <CodeBlock
        code={toText(codeNode.children).replace(/\n$/, "")}
        lang={languageOf(codeNode)}
      />
    );
  },
};

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="text-[1.0625rem]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
