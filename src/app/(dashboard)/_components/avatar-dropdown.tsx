"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { type Session } from "next-auth";

function AvatarDropdownMenu({ session }: { session: Session }) {
  const logoutHandler = async () => {
    await signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant={"outline"} className="p-0 cursor-pointer" asChild > */}
        <Avatar className="h-8 w-8 cursor-pointer ">
          <AvatarImage
            src={session.user?.image ?? undefined}
            alt="user-avatar"
          />
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
      <DropdownMenuContent className="w-72 shadow shadow-muted ">
        <DropdownMenuGroup className="flex flex-row items-center gap-4 px-6 py-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={session.user?.image ?? undefined}
              alt="user-avatar"
            />
            <AvatarFallback>
              {session.user?.name?.toUpperCase()[0] +
                `${
                  session.user?.name?.split(" ")[1]
                    ? session.user?.name?.split?.(" ")?.[1]?.toUpperCase()[0]
                    : ""
                }`}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p>{session.user.name}</p>
            <p className="text-xs text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer px-8">
            <Link href={"/profile"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer px-8 "
            onClick={logoutHandler}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarDropdownMenu;
