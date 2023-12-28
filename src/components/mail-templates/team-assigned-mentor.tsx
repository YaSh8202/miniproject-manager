import { env } from "@/env.mjs";
import * as React from "react";

interface EmailTemplateProps {
  team: {
    name: string;
    id: string;
  };
  mentorName: string;
  studentName: string;
}

const baseUrl = env.VERCEL_URL
  ? `https://${env.VERCEL_URL}`
  : "http://localhost:3000";

export const AssignedMentorMailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ team, mentorName, studentName }) => (
  <div>
    <h2>Hello {studentName} </h2>
    <h2>
      Your team <strong>{team.name}</strong> has been assigned a mentor{" "}
      <strong>{mentorName}</strong>.
    </h2>
    <p>You can contact your mentor by clicking on the link below.</p>

    <a href={`${baseUrl}/teams/${team.id}/mentor-list`}>Contact Mentor</a>
  </div>
);
