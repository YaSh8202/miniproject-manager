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
          batch: {
            select: {
              miniProject: true,
            },
          }
        },
      });

      if (!student) {
        throw new Error("Student not found");
      }

      if (!student.batch) {
        throw new Error("Student has no batch");
      }

      if (!student.batch.miniProject) {
        throw new Error("Student has no mini project");
      }

      const miniProjectId = student.batch.miniProject.id;

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

  get: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const team = await ctx.db.team.findUnique({
        where: {
          id: input.id,
        },
        include: {
          members: true,
        },
      });

      if (!team) {
        throw new Error("Team not found");
      }

      return team;
    }),
});
