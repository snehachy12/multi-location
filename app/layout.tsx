import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Swap Geist for Inter to match your dashboard's clean UI
const inter = Inter({
  variable: "--font-sans", // Matches the variable in your Tailwind CSS
  subsets: ["latin"],
});

// 2. Update the SEO metadata
export const metadata: Metadata = {
  title: "MetaMetric | Business Dashboard",
  description: "Executive intelligence for multi-location businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // 3. Apply the font variable, global background, and text colors
        className={`${inter.variable} font-sans bg-bg-main text-navy-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}