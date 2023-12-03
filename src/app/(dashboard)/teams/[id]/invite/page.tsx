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
import StudentMultiSelect from "@/components/ui/multi-select";
import React from "react";
import CurrentTeam from "./_components/current-team";
import { Link, Loader, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";

type Student = {
  mailId: string;
  available: boolean;
};

const InviteTeam = ({ params }: { params: { id: string } }) => {
  const [selected, setSelected] = React.useState<Student[]>([]);
  const { data: team, isLoading } = api.team.get.useQuery({
    id: params.id,
  });
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="animate-spin w-16 h-16 " />
      </div>
    );
  }

  if (!team) {
    redirect("/");
  }

  const inviteLink = `${window.location.origin}/teams/${params.id}/invite/${team.inviteCode}`;

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Card className="shadow-md dark:shadow-gray-500">
        <CardHeader>
          <CardTitle>Invite your team</CardTitle>
          <CardDescription>
            Invite your team members to join your team. You can invite up to 5
            members. Max team size is 3.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CurrentTeam />

          <StudentMultiSelect selected={selected} setSelected={setSelected} />
          <Button
            onClick={async () => {
              await navigator.clipboard.writeText(inviteLink);
              toast({
                title: "Copied to clipboard",
                description: "The link has been copied to your clipboard",
                duration: 2000
              });
            }}
            size={"sm"}
            className="ml-auto"
            variant={"ghost"}
          >
            <Link size={16} className="mr-1" />
            Invite with link
          </Button>
        </CardContent>

        <CardFooter>
          <Button disabled={selected.length === 0}>Invite to team</Button>
          <Button className="ml-2" variant={"ghost"}>
            I&apos;ll do this later
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InviteTeam;
