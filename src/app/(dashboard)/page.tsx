import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import StudentDashboard from "./_components/student/student-dashboard";
import MentorDashboard from "./_components/mentor/mentor-dashboard";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/sign-in");
  }
  console.log(session.user?.role);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      {session.user?.role === "STUDENT" && <StudentDashboard />}
      {session.user?.role === "MENTOR" && <MentorDashboard />}
    </main>
  );
}
