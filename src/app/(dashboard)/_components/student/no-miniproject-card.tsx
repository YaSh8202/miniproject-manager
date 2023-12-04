import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function NoMiniProjectCard() {
  return (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>Mini Project Not Started for Your Batch</CardTitle>
        <CardDescription className="text-base">
          It seems like the mini project for your batch has not started yet. No
          worries, we&apos;re here to keep you informed!
        </CardDescription>
        <CardDescription className="text-base">
          You&apos;ll be notified when the mini project starts via your college
          email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Notify Admin</Button>
      </CardContent>
    </Card>
  );
}

export default NoMiniProjectCard;
