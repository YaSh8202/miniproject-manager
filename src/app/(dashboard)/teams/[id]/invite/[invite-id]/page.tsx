import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import React from "react";

const InviteMember = async ({
  params,
}: {
  params: { id: string; "invite-id": string };
}) => {
  const session = await getServerAuthSession();

  console.log("params",params)
  if (!session) {
    redirect("/sign-in");
  }


  const team = await db.team.findUnique({
    where: {
      id: params.id,
    },
    include: {
      members: true,
    },
  });

  console.log(team);

  if (!team) {
    redirect("/");
  }

  if (team.inviteCode !== params["invite-id"]) {
    redirect("/");
  }

  if (team.members.length >= 3) {
    redirect("/");
  }

  if (team.members.find((member) => member.mail === session.user.email)) {
    redirect(`/teams/${params.id}`);
  }

  await db.team.update({
    where: {
      id: params.id,
    },
    data: {
      members: {
        connect: {
          mail: session.user.email!,
          // userId: session.user.id,
        },
      },
    },
  });

  redirect(`/teams/${params.id}`);

  return <div></div>;
};

export default InviteMember;
