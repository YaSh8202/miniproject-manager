import { getServerAuthSession } from "@/server/auth";
import Navbar from "./_components/navbar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden  ">
      <Navbar />
      {children}
    </div>
  );
}
