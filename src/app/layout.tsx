import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Michael Zahy - Media Buyer & Performance Marketing Expert",
  description: "Professional media buying and performance marketing services specializing in Facebook ads, Instagram ads, and digital advertising strategies. Helping businesses achieve measurable ROI through data-driven campaigns.",
  keywords: ["Michael Zahy", "Media Buyer", "Performance Marketing", "Facebook Ads", "Instagram Ads", "Digital Marketing", "Egypt", "Cairo", "Social Media Marketing", "ROI Optimization"],
  authors: [{ name: "Michael Zahy" }],
  openGraph: {
    title: "Michael Zahy - Media Buying & Performance Marketing Expert",
    description: "Professional media buying services specializing in Facebook and Instagram advertising with proven ROI results.",
    url: "https://michaelzahy.com",
    siteName: "Michael Zahy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Zahy - Media Buying Expert",
    description: "Professional media buying services with proven ROI results.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
