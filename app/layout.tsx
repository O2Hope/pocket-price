import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pocket price?",
  description: "Pokemon TCG card prices search engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased bg-bg`}>
        <Navigation />
        <NextTopLoader color="var(--main)" initialPosition={0.1} />
        <main className="w-full mx-auto px-4 max-w-4xl pt-28 min-h-[100dvh] flex flex-col ">
          {children}
        </main>
        <SpeedInsights />
      </body>
    </html>
  );
}
