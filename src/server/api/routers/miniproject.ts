import { z } from "zod";

import {
  createTRPCRouter,
  mentorProtectedProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const miniProjectRouter = createTRPCRouter({
  create: mentorProtectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        batchId: z.string(),
        lastDateToRegister: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call

      return ctx.db.miniProject.create({
        data: {
          name: input.name,
          description: input.description,
          batch: { connect: { id: input.batchId } },
          createdBy: { connect: { id: ctx.session.user.id } },
          lastDateToRegister: input.lastDateToRegister,
        },
      });
    }),

  getStudentMP: protectedProcedure.query(async ({ ctx }) => {
    const student = await ctx.db.student.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        batch: {
          select: {
            miniProject: true,
          },
        },
      },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    if (!student.batch) {
      throw new Error("Batch not found");
    }

    return student.batch.miniProject;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
