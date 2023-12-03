import React from "react";
import { studentDashboardAction } from "../_actions/student";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type Student = Awaited<ReturnType<typeof studentDashboardAction>>;

type Team = NonNullable<Pick<NonNullable<Student>, "team">["team"]>;

const InviteTeamCard = ({ team }: { team: Team }) => {
  
  
  const membersNeeded = 3 - team.members.length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="">Invite {membersNeeded} more members </CardTitle>
        <CardDescription className="text-base">
          You need to invite {membersNeeded} more members to complete your team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          className={`${buttonVariants()} `}
          href={`/teams/${team.id}/invite/`}
        >
          Invite members
        </Link>
      </CardContent>
    </Card>
  );
};

export default InviteTeamCard;
