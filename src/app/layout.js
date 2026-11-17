import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navigation/Navbar";
import Footer from "@/component/Navigation/Footer";
import Topbar from "@/component/Navigation/Topbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Apex School Rupandehi",
  description: "Where Learning Inspires Service and Excellence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      {/* Apply the font globally to the body */}
      <body className={`${poppins.className} min-h-full flex flex-col bg-gray-50`}>
        <Topbar/>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}