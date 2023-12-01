import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const CreateTeamCard = () => {
  return (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>Create Your Mini Project Team!</CardTitle>
        <CardDescription className="text-base">
          Ready to embark on your mini project journey? Be a team leader! Create
          a team of 3 and invite your batchmates. Or, enter an invite code from
          a friend&apos;s team.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-3">
        <Button>Create Team</Button>
        <Button>Join Team</Button>
      </CardContent>
    </Card>
  );
};

export default CreateTeamCard;
