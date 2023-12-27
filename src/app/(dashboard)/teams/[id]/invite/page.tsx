"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StudentMultiSelect from "@/components/ui/multi-select";
import React, { useMemo } from "react";
import CurrentTeam from "./_components/current-team";
import { Link as LinkIcon, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Student = {
  mailId: string;
  available: boolean;
};

const InviteTeam = ({ params }: { params: { id: string } }) => {
  const [selected, setSelected] = React.useState<Student[]>([]);
  const { data: students, isLoading: isLoadingStudents } =
    api.batch.getStudents.useQuery();
  const { data: team, isLoading } = api.team.get.useQuery({
    id: params.id,
  });
  const { toast } = useToast();
  const inviteStudentMutation = useMutation({
    mutationFn: ({
      teamName,
      inviteLink,
      inviteeEmails,
    }: {
      teamName: string;
      inviteLink: string;
      inviteeEmails: string[];
    }) => {
      return fetch("/api/send-mail/invite-to-team", {
        method: "POST",
        body: JSON.stringify({
          teamName,
          inviteLink,
          inviteeEmails,
        }),
      });
    },
  });

  const inviteHandler = async () => {
    if (!team) return;

    const teamName = team.name!;
    const inviteLink = `${window.location.origin}/teams/${params.id}/invite/${team.inviteCode}`;

    await inviteStudentMutation.mutateAsync({
      teamName,
      inviteLink,
      inviteeEmails: selected.map((student) => student.mailId),
    });

    toast({
      title: "Invited successfully",
      description: "The students have been invited to your team",
      duration: 2000,
    });

    setSelected([]);
  };

  const studentOptions = useMemo(() => {
    if (!students) return [];

    return students
      ?.filter((student) => {
        const members = team?.members ?? [];
        console.log(members);
        return !members.some((member) => member.mail === student.mail);
      })
      .map((student) => ({
        mailId: student.mail!,
        available: !student.teamId,
      })) satisfies Student[];
  }, [students, team?.members]);

  if (isLoading || isLoadingStudents) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin " />
      </div>
    );
  }

  if (!team) {
    redirect("/");
  }

  const inviteLink = `${window.location.origin}/teams/${params.id}/invite/${team.inviteCode}`;

  return (
    <div className="mt-[8rem] flex flex-1 flex-col items-center">
      <Card className="max-w-2xl shadow-md dark:shadow-gray-800">
        <CardHeader>
          <CardTitle>Invite your team</CardTitle>
          <CardDescription>
            Invite your team members to join your team. You can invite up to 5
            members. Max team size is 3.
          </CardDescription>
          <CardDescription>
            Pro tip: You can also share the invite link with your friends.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="mb-1 flex items-center justify-between">
            <CurrentTeam teamCount={team.members.length} />

            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={async () => {
                    await navigator.clipboard.writeText(inviteLink);
                    toast({
                      title: "Copied to clipboard",
                      description: "The link has been copied to your clipboard",
                      duration: 2000,
                    });
                  }}
                  size={"sm"}
                  className="ml-auto"
                  variant={"ghost"}
                >
                  <LinkIcon size={16} className="mr-1" />
                  Invite with link
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Click to copy the invite link to your clipboard
              </TooltipContent>
            </Tooltip>
          </div>
          <StudentMultiSelect
            options={studentOptions}
            selected={selected}
            setSelected={setSelected}
            disabled={selected.length >= 5 || inviteStudentMutation.isLoading}
          />
        </CardContent>

        <CardFooter>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={inviteHandler}
                  disabled={
                    selected.length === 0 || inviteStudentMutation.isLoading
                  }
                >
                  Invite to team
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {selected.length === 0
                  ? "Select atleast one student to invite"
                  : inviteStudentMutation.isLoading
                  ? "Sending invites..."
                  : "Invite the selected students to your team"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Link
            className={cn(buttonVariants({ variant: "ghost" }), "ml-2")}
            href={`/`}
          >
            I&apos;ll do this later
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InviteTeam;
