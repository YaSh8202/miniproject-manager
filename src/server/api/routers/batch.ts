// import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const batchRouter = createTRPCRouter({
  getBatch: protectedProcedure.query(async ({ ctx }) => {
    const student = await ctx.db.student.findUniqueOrThrow({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        batch: {
          include: {
            department: true,
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

    return student.batch;
  }),
});