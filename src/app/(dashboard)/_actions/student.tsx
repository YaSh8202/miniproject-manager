"use server";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export async function studentDashboardAction() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/sign-in");
  }

  const user = session.user;
  const student = await db.student.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      batch: true,
      miniProject: true,
      team: true,
    },
  });

  if (student) {
    return student;
  }

  // const mentor = await db.mentor.findUnique({
  //   where: {
  //     userId: user.id,
  //   },
  //   include: {
  //     assignedTeam: true,
  //     coordinator: true,
  //   },
  // });

  // if (mentor) {
  //   return {
  //     data: {
  //       mentor: mentor,
  //     },
  //     status: "success",
  //   };
  // }

  return null;
}
