"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FancyMultiSelect } from "@/components/ui/multi-select";
import React from "react";
import CurrentTeam from "./_components/current-team";
import { Link } from "lucide-react";

const InviteTeam = () => {



  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Invite your team</CardTitle>
          <CardDescription>
            Invite your team members to join your team. You can invite up to 5
            members. Max team size is 3.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CurrentTeam />

          <FancyMultiSelect />
          <Button size={"sm"} className="ml-auto" variant={"ghost"}>
            <Link size={16} className="mr-1" />
            Invite with link
          </Button>
        </CardContent>

        <CardFooter>
          <Button

          >Invite to team</Button>
          <Button className="ml-2" variant={"ghost"}>
            I&apos;ll do this later
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InviteTeam;
