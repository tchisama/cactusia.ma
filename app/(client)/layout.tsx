import type { Metadata } from "next";
import { Inter,Comfortaa,DM_Serif_Display } from "next/font/google"; import "../globals.css"; import Navbar from "./nav"; import { Toaster } from "@/components/ui/sonner"; import Footer from "./footer";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import LoadingProvider from "@/components/LoadingProvider";
// import PixelEvents from "@/components/facebook pixel/PixelEvents";
import Head from "next/head";
import Script from "next/script";
import { FacebookPixelEvents } from "@/components/FacebookPixel";

const kanit = DM_Serif_Display({ weight: "400", subsets: ["latin"],variable:"--font-kanit" });


const inter = Inter({ subsets: ["latin"] });
const comfortaa = Comfortaa({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Cactusia',
  description: 'cute cactuses for your sweet home or your office',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        {/* <Script
          id='fb-pixel'
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '381880481127138');
            fbq('track', 'PageView');
          `
          }}
        >
        </Script> */}
      <body className={inter.className}>
        <Navbar />
        <LoadingProvider>
        <div className="min-h-[55vh]">
          {children}

        </div>
        </LoadingProvider>
        <Footer />
        <Toaster />
                <Suspense fallback={null}>
          <FacebookPixelEvents />
        </Suspense>
      </body>
    </html>
  );
}
