import "./globals.css";
import {
  Playfair_Display,
  Plus_Jakarta_Sans,
  Courgette,
} from "next/font/google";

import TopLoader from "@/components/TopLoader";
import React from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth";

const courgette = Courgette({
  subsets: ["latin"],
  variable: "--font-courgette",
  weight: ["400"],
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
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
      <body
        className={`${sans.variable} ${display.variable} ${courgette.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <TopLoader />
          <Toaster
            toastOptions={{
              classNames: {
                icon: "group-data-[type=error]:text-rose-500 group-data-[type=success]:text-emerald-500 group-data-[type=warning]:text-amber-500 group-data-[type=info]:text-sky-500",
                error: "bg-rose-100 text-rose-700",
                success: "bg-emerald-100 text-emerald-700",
                warning: "bg-amber-50 text-amber-700",
                info: "bg-sky-100 text-sky-700",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
