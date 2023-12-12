import "@/styles/globals.css";
import { headers } from "next/headers";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import SessionProvider from "@/components/providers/session-provider";
import { getSession } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GeistSans } from "geist/font/sans";


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
    <html   lang="en">
      <body
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
className={GeistSans.className}
      >
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
