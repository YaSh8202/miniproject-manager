"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";

function AvatarDropdownMenu() {
  const logoutHandler = async () => {
    await signOut();
  };
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant={"outline"} className="p-0 cursor-pointer" asChild > */}
        <Avatar>
          <AvatarImage src={session.user?.image} alt="user-avatar" />
          <AvatarFallback>
            {session.user?.name?.toUpperCase()[0] +
              `${
                session.user?.name?.split(" ")[1]
                  ? session.user?.name?.split?.(" ")?.[1]?.toUpperCase()[0]
                  : ""
              }`}
          </AvatarFallback>
        </Avatar>
        {/* </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer " onClick={logoutHandler}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarDropdownMenu;
