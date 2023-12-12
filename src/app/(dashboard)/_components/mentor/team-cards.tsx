import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mentorDashboardAction } from "../../_actions/mentor";
// import { Team } from "@prisma/client";

type Mentor = Awaited<ReturnType<typeof mentorDashboardAction>>;
type Team = NonNullable<Mentor>["assignedTeam"][0];

function TeamCards({ team }: { team: Team }) {
  // console.log(team?.members);

  return (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>{team.projectTitle}</CardTitle>
        <CardDescription className="pt-4 text-base">
          {team.projectDesc}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Team Name: {team.name}</p>
        <p>Members:</p>
        <ul className="list-none text-base">
          {/* <li>Mem 1</li>
          <li>Mem 2</li>
          <li>Mem 3</li> */}
          {team.members.map((member) => (
            <li>{member.name}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default TeamCards;
