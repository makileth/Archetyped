import "../app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "../../components/shared/Topbar";
import Footer from "../../components/shared/Footer";
import QueryProvider from "../../components/other/QueryProvider";

export const metadata = {
  title: "CharacterVerse",
  description: "A DnD Character Creation App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body className={inter.className}>
            <div className="bg-white">
              <Topbar />

              {children}

              <Footer />
            </div>
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
