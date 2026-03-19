import Image from "next/image";
import React from "react";

/* ------------------------------------------------------------------ */
/* Custom heading with anchor link                                       */
/* ------------------------------------------------------------------ */

function createHeading(level: 2 | 3 | 4) {
  const Tag = `h${level}` as "h2" | "h3" | "h4";

  const sizes: Record<number, string> = {
    2: "text-2xl sm:text-3xl font-bold mt-10 mb-4",
    3: "text-xl sm:text-2xl font-semibold mt-8 mb-3",
    4: "text-lg sm:text-xl font-semibold mt-6 mb-2",
  };

  const Component = ({
    id,
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Tag
      id={id}
      className={`${sizes[level]} text-white group scroll-mt-24`}
      {...props}
    >
      {id ? (
        <a href={`#${id}`} className="no-underline hover:underline">
          {children}
        </a>
      ) : (
        children
      )}
    </Tag>
  );

  Component.displayName = `Heading${level}`;
  return Component;
}

/* ------------------------------------------------------------------ */
/* Callout component                                                     */
/* ------------------------------------------------------------------ */

type CalloutType = "info" | "warning" | "success" | "error";

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
}

const calloutStyles: Record<CalloutType, { bg: string; border: string; icon: string }> = {
  info: { bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.3)", icon: "ℹ️" },
  warning: { bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.3)", icon: "⚠️" },
  success: { bg: "rgba(0,255,65,0.08)", border: "rgba(0,255,65,0.3)", icon: "✅" },
  error: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.3)", icon: "❌" },
};

function Callout({ type = "info", children }: CalloutProps) {
  const styles = calloutStyles[type];
  return (
    <div
      className="my-6 flex gap-3 rounded-lg p-4"
      style={{
        background: styles.bg,
        border: `1px solid ${styles.border}`,
      }}
    >
      <span className="flex-shrink-0 text-lg leading-6">{styles.icon}</span>
      <div className="text-sm text-white/80 leading-relaxed">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MDX components map                                                    */
/* ------------------------------------------------------------------ */

export const mdxComponents = {
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),

  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 text-white/80 leading-7" {...props}>
      {children}
    </p>
  ),

  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className="underline decoration-[#06B6D4] underline-offset-2 transition-colors hover:text-[#06B6D4]"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),

  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 list-disc list-outside pl-6 space-y-1 text-white/80" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 list-decimal list-outside pl-6 space-y-1 text-white/80" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),

  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 pl-4 italic text-white/60"
      style={{ borderColor: "#06B6D4" }}
      {...props}
    >
      {children}
    </blockquote>
  ),

  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded px-1.5 py-0.5 text-sm font-mono"
      style={{
        background: "rgba(6,182,212,0.1)",
        color: "#06B6D4",
      }}
      {...props}
    >
      {children}
    </code>
  ),

  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl p-4 text-sm"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
      {...props}
    >
      {children}
    </pre>
  ),

  hr: () => (
    <hr className="my-8" style={{ borderColor: "rgba(255,255,255,0.1)" }} />
  ),

  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
      <table className="w-full text-sm text-white/80" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead style={{ background: "rgba(255,255,255,0.05)" }} {...props}>
      {children}
    </thead>
  ),

  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-3 text-left font-semibold text-white"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-3"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      {...props}
    >
      {children}
    </td>
  ),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img: ({ src, alt, ...props }: any) => (
    <div className="my-6 overflow-hidden rounded-xl">
      <Image
        src={src ?? ""}
        alt={alt ?? ""}
        width={800}
        height={400}
        className="w-full object-cover"
        {...props}
      />
    </div>
  ),

  // Custom Callout component — use in MDX as <Callout type="info">...</Callout>
  Callout,
};
