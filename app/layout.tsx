import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { PageRails, SectionDivider } from "@/components/ui/page-rail";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cal.com — Scheduling made simple",
  description:
    "A redesigned Cal.com homepage showing how scheduling grows from individuals to teams, organisations and developers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        {/* Rails wrapper gives PageRails its anchor and stops before footer */}
        <div className="relative flex flex-1 flex-col">
          <PageRails />
          <SiteHeader />
          {children}
          <SectionDivider variant="plain" />
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
