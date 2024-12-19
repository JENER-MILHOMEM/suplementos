import { Navbar } from "@/components/navbar";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { AdminGuard } from "@/components/admin-guard";

const font = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={` antialiased ${font.className}`}
      >
        <Navbar />
        <Toaster />
        <div className={`py-5 mx-5 xl:mx-20 mb-[90px] mt-[46px] md:mt-[60px]`}>
          <AdminGuard>
            {children}
          </AdminGuard>
        </div>
      </body>
    </html>
  );
}
