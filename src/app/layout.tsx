import "../app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Open_Sans } from "next/font/google";
import { Roboto } from "next/font/google";
import { Roboto_Flex } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "../../components/shared/Topbar";
import Footer from "../../components/shared/Footer";
import QueryProvider from "../../components/other/QueryProvider";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../components/shared/Sidebar";
import "./custom-toastify.css";

const openSans = Open_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["300", "400", "500", "700"], // Example weight values
  subsets: ["latin"],
});
const robotoFlex = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Archetyped",
  description: "Fictional Character Creation App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${robotoFlex.className} light`} suppressHydrationWarning={true}>
          <QueryProvider>
            <div className="bg-white">
              <Topbar />
              <Sidebar />
              {children}
              <Footer />
              <ToastContainer
                className="custom-toast-container "
                toastClassName="custom-toast custom-progress-bar-theme--light"
                progressClassName="custom-progress-bar-theme--light" // Apply custom progress bar styling
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