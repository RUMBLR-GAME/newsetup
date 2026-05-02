import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://fluid.au";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fluid · Send AUD anywhere. In 0.4 seconds.",
    template: "%s · Fluid",
  },
  description:
    "Free, instant payments built on Solana, settled in Australian dollars. AUDD is issued under ASIC AFSL by AUDC Pty Ltd. Beta running with 500 Townsville users.",
  keywords: [
    "Solana payments",
    "Australia",
    "AUDD",
    "stablecoin",
    "instant payments",
    "Australian fintech",
    "P2P payments",
    "AUSTRAC",
    "AFSL",
  ],
  authors: [{ name: "Fluid" }],
  creator: "Fluid",
  publisher: "Fluid",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Fluid · Send AUD anywhere. In 0.4 seconds.",
    description:
      "Free, instant payments built on Solana, settled in Australian dollars.",
    url: SITE_URL,
    siteName: "Fluid",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fluid — Send AUD anywhere. In 0.4 seconds.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluid · Send AUD anywhere. In 0.4 seconds.",
    description:
      "Free, instant payments built on Solana, settled in Australian dollars.",
    images: ["/og-image.png"],
    creator: "@fluidpayments",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
