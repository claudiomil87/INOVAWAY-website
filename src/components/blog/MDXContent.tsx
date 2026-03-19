interface MDXContentProps {
  code: string;
}

/**
 * Renders pre-compiled markdown HTML from Velite's s.markdown() schema.
 * Uses dangerouslySetInnerHTML to inject the HTML string produced by the
 * unified/rehype pipeline (including rehype-pretty-code syntax highlighting).
 *
 * This avoids the new Function() / eval() pattern that caused CSP / serverless
 * issues in the previous MDX approach.
 */
export default function MDXContent({ code }: MDXContentProps) {
  return (
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
