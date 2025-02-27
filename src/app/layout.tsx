// src/app/layout.tsx
import type { Metadata } from "next";
import ThemeProvider from "./components/providers/ThemeProvider";
import { LiveDataProvider } from "./components/providers/LiveDataContext";

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "Modern dashboard application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <LiveDataProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </LiveDataProvider>
      </body>
    </html>
  );
}
