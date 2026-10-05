import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { getPersonSchema } from "@/lib/schema";
import { generateMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const schemaMarkup = getPersonSchema();

  return (
    <html
      lang="en"
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
      <body className="flex min-h-full flex-col bg-white text-body">
        <ScrollToTop />
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
