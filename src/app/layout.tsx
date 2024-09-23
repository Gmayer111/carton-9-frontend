import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../global.css";
import "assets/scss/core.scss";
import { getServerSession } from "next-auth";
import { SessionProvider } from "./providers/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Le Carton à BD",
  description: "Application du Carton à BD",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="fr">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
