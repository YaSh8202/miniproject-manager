import { env } from "@/env.mjs";
import { db } from "@/server/db";
import { type Team } from "@prisma/client";

type Data = {
  miniProjectId: string;
  token: string;
};
const baseUrl = env.VERCEL_URL
  ? `https://${env.VERCEL_URL}`
  : "http://localhost:3000";

async function assignMentor(
  team: Pick<Team, "id" | "name" | "submittedAt">,
  mentorId: string,
  maxTeamsPerMentor = 3,
) {
  const mentor = await db.mentor.findUnique({
    where: {
      id: mentorId,
    },
    include: {
      assignedTeam: true,
    },
  });

  if (!mentor) {
    throw new Error("Invalid mentor id");
  }

  if (mentor.assignedTeam.length >= maxTeamsPerMentor) {
    return false;
  }

  await db.team.update({
    where: {
      id: team.id,
    },
    data: {
      assignedMentor: {
        connect: {
          id: mentor.id,
        },
      },
    },
  });

  console.log("assigned mentor", mentor.name, "to team", team.name);

  return true;
}

export async function POST(request: Request) {
  const data = (await request.json()) as Data;
  const { miniProjectId: id, token } = data;

  if (!id || !token) {
    return new Response("Invalid request");
  }

  const miniProject = await db.miniProject.findUnique({
    where: {
      id,
    },
    include: {
      teams: {
        select: {
          id: true,
          name: true,
          submittedAt: true,
          mentorList: true,
          members: {
            select: {
              id: true,
              name: true,
              mail: true,
            },
          },
        },
      },
      batch: {
        select: {
          department: {
            select: {
              mentors: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!miniProject) {
    return new Response("Invalid request");
  }


  const sortedTeams = miniProject.teams.sort((a, b) => {
    if (a.submittedAt && b.submittedAt) {
      return a.submittedAt.getTime() - b.submittedAt.getTime();
    } else if (a.submittedAt) {
      return -1;
    } else if (b.submittedAt) {
      return 1;
    } else {
      return 0;
    }
  });

  const maxTeamsPerMentor = Math.ceil(
    sortedTeams.length / (miniProject?.batch?.department.mentors.length ?? 1),
  );


  for (const team of sortedTeams) {
    if (!team?.mentorList) {
      return;
    }
    let assigned = false;

    for (const mentor of team.mentorList.order) {
      assigned = await assignMentor(team, mentor, maxTeamsPerMentor);

      if (assigned) {
        const mentorData = miniProject?.batch?.department.mentors.find(
          (m) => m.id === mentor,
        )
        const res = await fetch(`${baseUrl}/api/send-mail/team-mentor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            team: team,
            mentor: mentorData,
          }),
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await res.json();
        console.log("data", data);

        break;
      }
    }
  }

  return new Response("Hello world!");
}
