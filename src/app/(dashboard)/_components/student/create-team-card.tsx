import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
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
        <Link href="/create-team" className={buttonVariants()}>
          Create Team
        </Link>
        <Button>Join Team</Button>
      </CardContent>
    </Card>
  );
};

export default CreateTeamCard;
