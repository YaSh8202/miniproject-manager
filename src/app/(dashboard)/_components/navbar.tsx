import { ModeToggle } from "@/components/theme-mode-toggle";
import Link from "next/link";
import AvatarDropdownMenu from "./avatar-dropdown";

function Navbar() {

  return (
    <div className="border-b">
      <div className="mx-auto flex h-16 items-center  px-4">
        <Link href="/" className="text-2xl font-bold">
          Mini Project
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          {<AvatarDropdownMenu />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
