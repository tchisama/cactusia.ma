import Nav from "./nav"
import "../globals.css"
import { Comfortaa , Kanit,Inter } from "next/font/google";
import DashboardLogin from "./DashboardLogin";

const comfortaa = Comfortaa({ subsets: ["latin"] });
export const metadata = {
  title: 'Cactusia',
  description: 'cute cactuses for your sweet home or your office',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={comfortaa.className}>
          <DashboardLogin>
        <div className="flex h-screen w-full">
              <Nav />
              <div className="flex-1 overflow-y-auto h-screen">
                  {children}
              </div>
        </div>
          </DashboardLogin>
      </body>
    </html>
  )
}
