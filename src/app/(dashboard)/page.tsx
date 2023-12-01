import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import StudentDashboard from "./_components/student-dashboard";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <StudentDashboard />
    </main>
  );
}
