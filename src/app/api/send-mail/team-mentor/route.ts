import { AssignedMentorMailTemplate } from "@/components/mail-templates/team-assigned-mentor";
import { env } from "@/env.mjs";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

type Data = {
  team: {
    name: string;
    id: string;
    members: {
      id: string;
      name: string;
      mail: string;
    }[];
  };
  mentor: {
    id: string;
    name: string;
    email: string;
  };
};

export async function POST(request: Request) {
  const data = (await request.json()) as Data;

  try {
    const allMailsPromise = data.team.members.map((member) => {
      return resend.emails.send({
        from: `MiniProjectManager <invite@updates.yashbajaj.me>`,
        to: member.mail,
        subject: "Your team has been assigned a mentor",
        react: AssignedMentorMailTemplate({
          mentorName: data.mentor.name,
          team: {
            name: data.team.name,
            id: data.team.id,
          },
          studentName: member.name,
        }),
        text: "",
      });
    });

    const mailsData = await Promise.all(allMailsPromise);
    console.log("mailsData", mailsData)

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
