"use client";

import React, { useState } from "react";
import { type Mentor } from "@prisma/client";
import {
  DragDropContext,
  Droppable,
  type DropResult,
} from "react-beautiful-dnd";
import MentorCard from "./mentor-card";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CardProps {
  mentorOrder: Mentor[];
}

function MentorsList({ mentorOrder }: CardProps) {
  const [mentors, setMentors] = useState(mentorOrder);
  const updateMentorsMutation = api.team.updateMentorList.useMutation({
    onSuccess: (data) => {
      if (!data) return;
      setMentors(data);
    },
  });
  const router = useRouter();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(mentors);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem!);

    setMentors(items);
  };

  const handleSave = () => {
    updateMentorsMutation.mutate({
      mentorList: mentors.map((mentor) => mentor.id),
    });
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="mentors">
          {(provided) => (
            <ul
              className="scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-muted-foreground scrollbar-track-secondary flex max-h-[65vh] flex-col overflow-auto "
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {mentors.map((mentor, index) => {
                return (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    index={index}
                    isDragDisabled={updateMentorsMutation.isLoading}
                  />
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className="ml-auto mt-6">
        <Button
          variant="outline"
          className="mr-4"
          disabled={updateMentorsMutation.isLoading}
          onClick={() => {
            router.back();
          }}
        >
          Go back
        </Button>
        <Button disabled={updateMentorsMutation.isLoading} onClick={handleSave}>
          {updateMentorsMutation.isLoading && (
            <Loader2 className="mr-2 animate-spin" size={16} />
          )}
          Save
        </Button>
      </div>
    </div>
  );
}

export default MentorsList;
