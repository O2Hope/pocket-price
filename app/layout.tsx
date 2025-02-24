import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Should i?",
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
        <main className="w-full mx-auto px-4 max-w-4xl pt-28 min-h-[100dvh] flex flex-col ">
          {children}\
        </main>
      </body>
    </html>
  );
}
