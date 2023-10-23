import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import SessionProvider from '@/components/providers/session-provider'
import { getSession } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Mini Project Manager",
  description: "SMVDU Mini Project Manager",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider headers={headers()}>
          <SessionProvider session={session} >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
