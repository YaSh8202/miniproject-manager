import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import SessionProvider from "@/components/providers/session-provider";
import { getSession } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

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
        <SessionProvider session={session}>
          <TRPCReactProvider headers={headers()}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster />
            </ThemeProvider>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
