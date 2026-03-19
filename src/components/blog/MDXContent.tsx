"use client";

import * as runtime from "react/jsx-runtime";
import React from "react";

interface MDXContentProps {
  code: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: Record<string, React.ComponentType<any>>;
}

// Evaluates Velite's compiled MDX code and renders it with custom components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useMDXComponent(code: string): React.ComponentType<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fn = new Function("runtime", `${code}`) as (runtime: any) => { default: React.ComponentType<any> };
  return fn({ ...runtime }).default;
}

export default function MDXContent({ code, components = {} }: MDXContentProps) {
  const MDXComponent = useMDXComponent(code);
  return <MDXComponent components={components} />;
}
