import type { Metadata } from "next";
import {  Glegoo, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import ShoppingCartModal from "@/components/ShoppingCartModel";
import { Toaster } from "@/components/ui/sonner";
import UserButtons from "@/components/UserButtons";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight : ["400","600" ,"800"]
});

const glegoo = Glegoo({
  variable: "--font-glegoo",
  subsets: ["latin"],
  weight : ["400"]
});

export const metadata: Metadata = {
  title: "Adrene's Bakery",
  icons :{
    icon : "/favicon.ico"
  },
  description: "Coded and designed by Travis Ang",
  keywords : ["NextJs" , "TypeScript","JavaScript"], 
  metadataBase : new URL("https://www.adrenesbakery.com"), 
  twitter : { 
    card: "summary_large_image", 
    site : "https://www.adrenesbakery.com", 
    creator : "@TravisAng", 
    title : "Adrene's Bakery | Baked treats fit for any occasion", 
    description : "Cookies , Mooncakes , Cakes ... Anything !", 
    images: ["feature.png"]
  }, 
  openGraph : { 
    title : "Adrene's Bakery | Baked treats fit for any occasion", 
    description : "Cookies , Mooncakes , Cakes ... Anything !", 
    url : "https://www.adrenesbakery.com",
    siteName :"Adrene's Bakery",
    images: ["feature.png"], 

  }


  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <ShoppingCartModal />
        <body
          className={`${poppins.variable} ${glegoo.variable} antialiased font-poppins`}
        >
          <Navbar />
          {children}
          <Toaster />
          <Footer />
          <UserButtons />
        </body>
        
      </Providers>
      
    </html>
  );
}
