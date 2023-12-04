import { EmailTemplate } from "@/components/mail-templates/invite-to-team";
import { env } from "@/env.mjs";
import { getServerAuthSession } from "@/server/auth";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

type Data = {
  teamName: string;
  inviterName: string;
  inviteLink: string;
  inviteeEmail: string;
};

export async function POST(request: Request) {
  // get the email address from the request body
  const data = (await request.json()) as Data;
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.redirect("/sign-in");
  }

  const inviterName = session.user.name!;

  console.log("data", data)

  try {
    const res = await resend.emails.send({
      from: `MiniProjectManager <invite@updates.yashbajaj.me>`,
      to: [data.inviteeEmail],
      subject: "You have been invited to a team",
      react: EmailTemplate({
        inviteeEmail: data.inviteeEmail,
        teamName: data.teamName,
        inviterName: inviterName,
        inviteLink: data.inviteLink,
      }),
      text: "",
    });

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
