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
      batch: {
        include: {
          miniProject: true,
        },
      },
      miniProject: true,
      team: {
        include: {
          members: true,
        },
      },
    },
  });

  if (student) {
    return student;
  }

  return null;
}
