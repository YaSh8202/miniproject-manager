import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="flex flex-1 flex-row">
      <div className="w-[300px] border-r border-border"></div>
      <div className="flex flex-1 flex-col ">
        
      </div>
    </main>
  );
}
