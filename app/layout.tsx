import "./globals.css";
import { Roboto_Slab as Inter } from "next/font/google";

import TopLoader from "@/components/TopLoader";
import React from "react";
import { Toaster } from "sonner";

const inter = Inter({
  weight: ["200", "400", "500", "700", "800"],
  subsets: ["cyrillic", "latin"],
});

export const metadata = {
  title: "FairLove - Share Genuine Love",
  description:
    "Send anonymous heartfelt messages and virtual gifts to your loved ones.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
          {children}
          <TopLoader />
          <Toaster
            toastOptions={{
              classNames: {
                icon: "group-data-[type=error]:text-red-500 group-data-[type=success]:text-green-500 group-data-[type=warning]:text-amber-500 group-data-[type=info]:text-blue-500",
                error: "bg-red-400",
                success: "text-green-400",
                warning: "text-yellow-400",
                info: "bg-blue-400",
              },
            }}
          />
      </body>
    </html>
  );
}
