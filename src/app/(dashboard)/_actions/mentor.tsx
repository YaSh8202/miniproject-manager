"use server";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export async function mentorDashboardAction() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/sign-in");
  }

  const user = session.user;
  const mentor = await db.mentor.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      assignedTeam: {
        select: {
          name: true,
          projectTitle: true,
          projectDesc: true,
          members: true,
        },
      },
    },
  });
  console.log(mentor);

  if (mentor) {
    return mentor;
  }

  return null;
}
