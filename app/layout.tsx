import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Ludena — Selected Work",
  description:
    "Selected product design and front-end engineering work by John Ludena.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
