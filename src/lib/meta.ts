import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#16181d",
};

export const metadata: Metadata = {
  title: "Mika Senghaas",
  description: "Master's student in Data Science at EPFL",
  metadataBase: new URL("https://www.mikasenghaas.de"),
  manifest: "/manifest.json",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "android-chrome-192x192",
      sizes: "192x192",
      url: "/favicon/android-chrome-192x192.png",
    },
    {
      rel: "android-chrome-512x512",
      sizes: "512x512",
      url: "/favicon/android-chrome-512x512.png",
    },
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Mika Senghaas",
    siteName: "Mika Senghaas",
    description: "Master's student in Data Science at EPFL",
    url: "https://mikasenghaas.de",
    images: [
      {
        url: "/img/og.jpeg",
        width: 1200,
        height: 630,
        alt: "Mika Senghaas Avatar",
      },
    ],
    locale: "en_UK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mika Senghaas",
    description: "Master's student in Data Science at EPFL",
    creator: "@mikasenghaas",
    images: ["/img/og.jpeg"],
  },
};
