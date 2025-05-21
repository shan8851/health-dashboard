import { type Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "~/components/ui/sonner";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import Footer from "./_components/layout/footer";
import Header from "./_components/layout/header";

export const metadata: Metadata = {
  title: "Shan's Dashboard",
  description: "Personal dashboard built with T3 + Dracula vibes",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable}`}>
      <body className="bg-background text-foreground flex min-h-screen flex-col font-sans">
        <TRPCReactProvider>
          <Header />
          <main className="flex-1 p-6">{children}</main>
          <Toaster position="top-right" richColors />
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
