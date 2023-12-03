import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TeamInfoForm from "./_components/team-info-form";
import InviteMembers from "./_components/invite-members";

const CrateTeamPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Card className="relative bottom-8 w-[35rem]">
        <CardHeader>
          <CardTitle>Create Team</CardTitle>
          <CardDescription>
            As the team leader, you have the exciting responsibility of forming
            a team for your mini project. Please fill out the details below to
            get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TeamInfoForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CrateTeamPage;
