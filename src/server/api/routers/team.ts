import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const teamRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        teamName: z.string().min(1),
        projectTitle: z.string().optional(),
        projectDesc: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call

      const student = await ctx.db.student.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          miniProject: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!student) {
        throw new Error("Student not found");
      }

      if (!student.miniProject) {
        throw new Error("Student has no mini project");
      }

      const miniProjectId = student.miniProject.id;

      const team = await ctx.db.team.create({
        data: {
          name: input.teamName,
          projectTitle: input.projectTitle,
          projectDesc: input.projectDesc,

          members: {
            connect: {
              userId: ctx.session.user.id,
            },
          },
          miniProject: {
            connect: {
              id: miniProjectId,
            },
          },
        },
      });

      return team.id;
    }),
});
