import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samma",
  description: "A Vipassana-rooted mindfulness practice for real life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
