import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/layout/layout-shell";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "GuardTrack",
  description:
    "E-learning platform voor beveiligers bij evenementen en festivals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${plusJakartaSans.variable} font-sans`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
