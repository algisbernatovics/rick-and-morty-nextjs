import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getMetadataBase, getSiteDescription, getSiteName } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const rawGaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const gaMeasurementId =
  rawGaMeasurementId && /^G-[A-Z0-9]+$/.test(rawGaMeasurementId) ? rawGaMeasurementId : undefined;

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: getSiteName(),
    template: `%s | ${getSiteName()}`,
  },
  description: getSiteDescription(),
  applicationName: getSiteName(),
  keywords: [
    "Rick and Morty characters",
    "Rick and Morty episodes",
    "Rick and Morty locations",
    "Rick and Morty guide",
  ],
  openGraph: {
    type: "website",
    siteName: getSiteName(),
    locale: "en_US",
    title: getSiteName(),
    description: getSiteDescription(),
    images: [{ url: "/icon.svg", alt: getSiteName() }],
  },
  twitter: {
    card: "summary_large_image",
    title: getSiteName(),
    description: getSiteDescription(),
    images: ["/icon.svg"],
  },
  verification: {
    google: "googled7cb6c8b4b7e6ade",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${JSON.stringify(gaMeasurementId)});
              `}
            </Script>
          </>
        ) : null}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="min-h-screen bg-background">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
