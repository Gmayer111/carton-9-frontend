import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../global.css";
import "assets/scss/core.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Le Carton à BD",
  description: "Application du Carton à BD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
