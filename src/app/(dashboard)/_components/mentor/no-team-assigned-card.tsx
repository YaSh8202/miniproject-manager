import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function NoTeamAssignedCard() {
  return (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>No Teams Assigned</CardTitle>
        <CardDescription className="text-base">
          It appears that there are currently no assigned teams associated with
          your profile. For further information, kindly reach out to the
          coordinator.
        </CardDescription>
        {/* <CardDescription className="text-base">
          You&apos;ll be notified of your assigned teams via 
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <Button>Notify Admin</Button>
      </CardContent>
    </Card>
  );
}

export default NoTeamAssignedCard;
