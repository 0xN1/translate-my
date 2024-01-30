import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "translateMY",
  description:
    "A translation tool for Bahasa Melayu to English with support for Manglish and Bahasa Pasar.",
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
