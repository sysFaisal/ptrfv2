import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { config } from "@/lib/config";
import ThemeScript from "@/components/ThemeScript";
import "./globals.css";

const geistSans = localFont({
  variable: "--font-geist-sans",
  display: "swap",
  src: [
    {
      path: "../public/fonts/geist-sans.woff2",
      weight: "400 500",
      style: "normal",
    },
    {
      path: "../public/fonts/geist-sans-italic.woff2",
      weight: "400 500",
      style: "italic",
    },
  ],
});

const geistMono = localFont({
  variable: "--font-geist-mono",
  display: "swap",
  src: [
    {
      path: "../public/fonts/geist-mono.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/geist-mono-medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sakuspace.my.id"),
  title: config.meta.title,
  description: config.meta.description,
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: config.meta.title,
    description: config.meta.description,
    type: "website",
    images: [
      {
        url: "/me.jpg",
        width: 40,
        height: 40,
        alt: config.site.name,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: config.meta.themeColor,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body
        className="bg-bg text-ink-100 font-sans antialiased"
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:px-4 focus:py-2 focus:bg-accent focus:text-bg focus:rounded-full focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
