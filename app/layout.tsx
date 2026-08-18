import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { config } from "@/lib/config";
import ThemeScript from "@/components/ThemeScript";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
        width: 512,
        height: 512,
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
