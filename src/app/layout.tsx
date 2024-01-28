import "../app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "../../components/shared/Topbar";
import Footer from "../../components/shared/Footer";
import QueryProvider from "../../components/other/QueryProvider";
import { ToastContainer } from "react-toastify";

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
      <html lang="en">
        <body className={inter.className}>
          <QueryProvider>
            <div className="bg-white">
              <Topbar />

              {children}

              <Footer />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />

             
            </div>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
