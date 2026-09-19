import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPersonSchema } from "@/lib/schema";
import { generateMetadata } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...generateMetadata({
    title: "Slavi Dimitrov - Fullstack Developer",
    description:
      "Fullstack developer specializing in React, Vue, Django, and PostgreSQL. Building production systems at Waracle.",
    keywords: ["fullstack", "developer", "aytos", "sofia", "bulgaria", "web development"],
  }),
  metadataBase: new URL("https://slavidimitrov.com"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const schemaMarkup = getPersonSchema();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaMarkup),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-white text-black dark:bg-black dark:text-white">
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />

        {/* Vercel Analytics - Automatic tracking */}
        <Script
          strategy="afterInteractive"
          src="https://cdn.vercel-analytics.com/v1/script.demo.js"
        />
      </body>
    </html>
  );
}
