import * as React from "react";

interface EmailTemplateProps {
  teamName: string;
  inviterName: string;
  inviteLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  teamName,
  inviterName,
  inviteLink,
}) => (
  <div>
    <h2>Hello</h2>
    <h2>
      {inviterName} has invited you to join their team <strong>{teamName}</strong> on the Mini Project Portal.
    </h2>
    <p>
      You can accept the invitation by clicking on the link below.
      You can ignore this email if you do not want to join the team.
    </p>

    <a href={inviteLink}>Accept Invitation</a>
  </div>
);
