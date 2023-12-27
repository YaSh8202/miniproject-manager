import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  buttonVariants } from "@/components/ui/button";
import { api } from "@/trpc/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import TeamSubmitBtn from "./_components/team-submit";
import { cn } from "@/lib/utils";

const TeamPage = async ({ params }: { params: { id: string } }) => {
  const teamId = params.id;
  const team = await api.team.get.query({
    id: teamId,
  });

  if (!team) {
    redirect("/");
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const submittedAt = team.submittedAt?.toDateString();

  return (
    <div className="mx-auto my-10 flex h-[calc(100vh-64px)] w-[32rem]  flex-col ">
      <div className="flex-1">
        <h1 className="text-3xl font-semibold ">{team.name}</h1>
        <p className="text-xl font-semibold text-muted-foreground">
          {team.projectTitle}
        </p>
        <p>{team.projectDesc}</p>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Members</h2>
          <ul className="mt-4">
            {team.members.map((member) => (
              <li key={member.id} className="flex items-center space-x-4">
                <Avatar className="h-8 w-8 cursor-pointer ">
                  <AvatarImage
                    src={member.user?.image ?? undefined}
                    alt="user-avatar"
                  />
                  <AvatarFallback>
                    {member.user?.name?.toUpperCase()[0] +
                      `${
                        member.user?.name?.split(" ")[1]
                          ? member.user?.name
                              ?.split?.(" ")?.[1]
                              ?.toUpperCase()[0]
                          : ""
                      }`}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.mail}</p>
                </div>
              </li>
            ))}
          </ul>
          {
            team.members.length< 3 && (
              <div className="mt-4">
                <p className="text-muted-foreground" >
                  Your team needs to have 3 members. Please invite {3-team.members.length} more members to your team.
                </p>
                <Link href={`/teams/${teamId}/invite`} className={
                  cn(buttonVariants(
                    {
                      variant: "secondary",
                    }
                  ), "mt-4")
                }>
                  Invite more members
                </Link>
              </div>
            )
          }
        </div>
      </div>



      {!team.submittedAt ? (
        <div className="py-4 text-primary">
          <p className="">
            Submit your team and mentor details early! Mentor assignments are on
            a first-come, first-served basis.
          </p>
          <p>Once submitted, no alterations can be made.</p>
        </div>
      ) : (
        <div className="pb-4" >
          <p className="text-primary">
            Submitted on {submittedAt}
          </p>
          <p>
            You have already submitted your team and mentor details. No
            alterations can be made.
          </p>
        </div>
      )}

      <form className="my-auto flex flex-row items-center gap-4">
        <Link
          href={`/teams/${teamId}/mentor-list`}
          className={buttonVariants({
            variant: "secondary",
          })}
        >
          View Mentor List
        </Link>
        {!team.submittedAt && team.members.length===3 && <TeamSubmitBtn teamId={teamId} />}
      </form>
    </div>
  );
};

export default TeamPage;
