import Navbar from "./_components/navbar";

export default function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  

  return (
    <main className="flex min-h-screen flex-col  ">
      <Navbar />
    </main>
  );
}

