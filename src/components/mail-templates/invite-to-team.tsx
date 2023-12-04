import * as React from "react";

interface EmailTemplateProps {
  inviteeEmail: string;
  teamName: string;
  inviterName: string;
  inviteLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  inviteeEmail,
  teamName,
  inviterName,
  inviteLink,
}) => (
  <div>
    <h1>Hello, {inviteeEmail}</h1>
    <h2>
      {inviterName} has invited you to join their team <strong>{teamName}</strong> on the Mini Project Portal.
    </h2>
    <p>
      You can accept the invitation by clicking on the link below. If you don&apos;t
      have an account, you will be asked to create one.
    </p>
    <a href={inviteLink}>Accept Invitation</a>
  </div>
);
