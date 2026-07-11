import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles/index.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Yogesh Chandra Portfolio",
  description:
    "A sleek personal portfolio with project detail pages, resume navigation, and contact information.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
