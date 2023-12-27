"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import React from "react";

const TeamSubmitBtn = ({ teamId }: { teamId: string }) => {
  const submitTeamMutation = api.team.submitTeam.useMutation();

  const submitHandler = async () => {
    await submitTeamMutation.mutateAsync({
      teamId: teamId,
    });
  };

  return <Button onClick={submitHandler}>Submit</Button>;
};

export default TeamSubmitBtn;
