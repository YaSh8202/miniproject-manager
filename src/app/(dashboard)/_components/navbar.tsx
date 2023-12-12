import { ModeToggle } from "@/components/theme-mode-toggle";
import Link from "next/link";
import AvatarDropdownMenu from "./avatar-dropdown";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

async function Navbar() {
  const session = await getServerAuthSession();

  if (!session) redirect("/sign-in");

  return (
    <div className="border-b">
      <div className="mx-auto flex h-16 items-center  px-4">
        <Link href="/" className="text-2xl font-bold">
          Mini Project
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <AvatarDropdownMenu session={session} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
