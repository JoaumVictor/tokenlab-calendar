import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/user";
import { EventProvider } from "@/context/event";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calendar App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <EventProvider>{children}</EventProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
