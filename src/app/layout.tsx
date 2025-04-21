import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "NeedToKnow - Start informed. Stay ahead.",
  description: "High-signal daily news for professionals who move fast",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#8438FF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="min-h-screen bg-[#121212] text-[#FFFFFF]">
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
