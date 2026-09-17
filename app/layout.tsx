import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slavi Dimitrov - Fullstack Developer",
  description:
    "Personal portfolio of Slavi Dimitrov, a fullstack developer working across React, Vue and Django with a growing focus on backend engineering.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
    <body className="flex min-h-full flex-col bg-white text-black dark:bg-black dark:text-white">
      <Header />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </body>
    </html>
  );
}
