"use client"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";

const font = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <html lang="en">
      <body
        className={` antialiased ${font.className} py-5 mx-5 md:mx-20 ${isMobile ? 'mb-[90px]' : 'mt-[60px]'}`}
      >
        <Navbar/>
        <Toaster/>
        {children}
      </body>
    </html>
  );
}
