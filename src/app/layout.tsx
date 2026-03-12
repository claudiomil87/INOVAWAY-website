// Root layout — minimal wrapper
// The actual layout (fonts, header, footer, metadata) lives in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
