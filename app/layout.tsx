import BottomNav from "./(components)/nav/BottomNav";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "fortuna",
  description: "Event tracking app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen w-screen p-4">
          {children}
          <BottomNav />
        </main>
      </body>
    </html>
  );
}
