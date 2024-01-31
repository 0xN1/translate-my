import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Viewport } from "next";

const APP_NAME = "TranslateMY";
const APP_DEFAULT_TITLE = "TranslateMY";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION =
  "A translation app for Bahasa Melayu to English with support for Manglish and bahasa pasar.";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} selection:bg-orange-500 selection:text-white`}
      >
        <Background />
        {children}
      </body>
    </html>
  );
}

const Background = () => {
  return (
    <>
      <div className="absolute inset-0 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#888_250%)] pointer-events-none -z-20" />
      <div className="absolute inset-0 h-full w-full bg-transparent bg-[radial-gradient(#ddd_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none -z-10" />
    </>
  );
};
