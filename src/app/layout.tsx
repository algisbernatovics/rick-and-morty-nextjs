import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
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
  },
  twitter: {
    card: "summary_large_image",
    title: getSiteName(),
    description: getSiteDescription(),
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
        <Navbar />
        <main className="min-h-screen bg-background">
          {children}
        </main>
        <footer className="border-t border-border-subtle bg-surface-glass py-10 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Rick and Morty Explorer. Data provided by the <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer" className="focus-ring rounded text-primary hover:underline">Rick and Morty API</a>.
          </p>
        </footer>
      </body>
    </html>
  );
}
