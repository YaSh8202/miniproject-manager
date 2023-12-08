import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Team } from "@prisma/client";
import Link from "next/link";
import React from "react";

function AddMentorListCard({ team }: { team: Team }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Mentor List</CardTitle>
        <CardDescription>
          Give your order of preference for the mentors you want to work with.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link
          href={`/teams/${team.id}/mentor-list`}
          className={buttonVariants()}
        >
          Set Mentor List
        </Link>
      </CardFooter>
    </Card>
  );
}

export default AddMentorListCard;
