import type { Metadata } from "next";
import { Inter, Manrope, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
});

const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Mira Growth Hack",
  description:
    "Построй свою AI-powered growth-машину за 10 дней и приводи пользователей в Mira.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={cn(
        "h-full scroll-smooth antialiased",
        inter.variable,
        manrope.variable,
        notoSansMono.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">
        <script src="/theme-init.js" />
        {children}
      </body>
    </html>
  );
}
