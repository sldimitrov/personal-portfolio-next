import type { Metadata } from "next";

interface PageMetadataProps {
  title: string;
  description: string;
  slug?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedDate?: string;
}

export function generateMetadata(props: PageMetadataProps): Metadata {
  const {
    title,
    description,
    slug = "",
    image = "/og-image.png",
    keywords = [],
    type = "website",
    publishedDate,
  } = props;

  const baseUrl = "https://slavidimitrov.com";
  const url = slug ? `${baseUrl}/${slug}` : baseUrl;

  return {
    title: slug ? `${title} | Slavi Dimitrov` : title,
    description,
    keywords: [
      "fullstack developer",
      "react",
      "vue",
      "django",
      "postgresql",
      "typescript",
      "next.js",
      ...keywords,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: slug ? `${title} | Slavi Dimitrov` : title,
      description,
      url,
      siteName: "Slavi Dimitrov - Fullstack Developer",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: slug ? `${title} | Slavi Dimitrov` : title,
      description,
      images: [image],
      creator: "@slavidimitrov",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    ...(publishedDate && {
      authors: [{ name: "Slavi Dimitrov" }],
      publishedTime: publishedDate,
      tags: keywords,
    }),
  };
}
