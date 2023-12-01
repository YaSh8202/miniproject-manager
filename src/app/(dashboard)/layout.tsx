import Navbar from "./_components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden  ">
      <Navbar />
      {children}
    </div>
  );
}
