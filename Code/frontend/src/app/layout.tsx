import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VendorFlow",
  description: "Empowering Local. Connecting Communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-vendor-gray/20 min-h-screen`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
