import { api } from "@/trpc/server";
import React from "react";
import MentorsList from "./_components/mentors";

export default async function MentorListPage({
  params,
}: {
  params: { id: string };
}) {
  const mentorOrder = await api.team.getMentorList.query({});

  return (
    <div className="flex h-[calc(100vh-16px)] w-full flex-grow flex-col items-center ">
      <div className="flex w-[32rem] flex-1 flex-col overflow-hidden border-none">
        <div className="my-4">
          <h2 className="mb-1 text-3xl font-bold">Mentor list</h2>
          <p className="text-muted-foreground">
            Order your mentors by priority for your team.
          </p>
          <p className="text-muted-foreground">
            You can drag and drop mentors to change their order.
          </p>
        </div>

        <div className="flex-1 overflow-hidden">
          {!mentorOrder ? (
            <div className="flex flex-col items-center justify-center">
              <div className="mt-4 text-lg font-semibold">No mentors yet</div>
            </div>
          ) : (
            <MentorsList mentorOrder={mentorOrder} id={params.id} />
          )}
        </div>
      </div>
    </div>
  );
}
