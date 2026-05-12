import type { Metadata } from "next";
import { Inter, Manrope, Noto_Sans_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";

const metaPixelId = "1268867115231788";

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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* biome-ignore lint/performance/noImgElement: Meta Pixel noscript fallback must use a raw image. */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
          />
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
