import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Mentor } from "@prisma/client";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "@/components/ui/card";

interface CardProps {
  mentor: Mentor;
  index: number;
  isDragDisabled?: boolean;
}

function MentorCard({ mentor, index, isDragDisabled = false }: CardProps) {
  return (
    <Draggable
      isDragDisabled={isDragDisabled}
      draggableId={mentor.id}
      index={index}
    >
      {(provided, snapshot) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          data-isdragging={snapshot.isDragging && !snapshot.isDropAnimating}
          className="my-2 flex flex-row items-center justify-between border-border px-3 py-2"
        >
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>
                {mentor?.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-lg font-semibold">{mentor.name}</div>
              <div className="text-sm text-gray-500">{mentor.email}</div>
            </div>
          </div>
          <div className="text-4xl font-semibold">{index + 1}</div>
        </Card>
      )}
    </Draggable>
  );
}

export default MentorCard;
