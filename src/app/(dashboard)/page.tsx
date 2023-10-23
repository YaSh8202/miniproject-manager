import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import Navbar from "./_components/navbar";
// import { api } from "@/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col  ">
      <Navbar />
    </main>
  );
}

