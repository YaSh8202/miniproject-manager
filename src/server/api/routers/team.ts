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
              department: {
                select: {
                  mentors: true,
                },
              },
            },
          },
        },
      });

      console.log(student);

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
      const mentors = student.batch.department.mentors;

      const order = mentors.map((mentor) => mentor.id);

      // const mentorList = await ctx.db.mentorList.create({

      // })

      // const departmentMentors = await ctx.db.student

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
          mentorList: {
            create: {
              order: order,
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

  getMentorList: protectedProcedure
    .input(z.object({}))
    .query(async ({ ctx }) => {
      const student = await ctx.db.student.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          team: {
            include: {
              mentorList: true,
            },
          },
          batch: {
            include: {
              department: {
                include: {
                  mentors: true,
                },
              },
            },
          },
        },
      });

      if (!student) {
        throw new Error("Student not found");
      }

      if (!student.team) {
        throw new Error("Student has no team");
      }

      const mentors = student.batch?.department.mentors;

      if (!mentors) {
        throw new Error("Student's department has no mentors");
      }

      const mentorOrder = student.team.mentorList?.order.map((mentorId) => {
        const mentor = mentors.find((mentor) => mentor.id === mentorId);

        if (!mentor) {
          throw new Error("Mentor not found");
        }

        return mentor;
      });

      return mentorOrder;
    }),

  updateMentorList: protectedProcedure
    .input(
      z.object({
        mentorList: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const student = await ctx.db.student.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          teamId: true,
          batch: {
            include: {
              department: {
                include: {
                  mentors: true,
                },
              },
            },
          },
        },
      });

      if (!student) {
        throw new Error("Student not found");
      }

      if (!student.teamId) {
        throw new Error("Student has no team");
      }

      const mentors = student.batch?.department.mentors;

      if (!mentors) {
        throw new Error("Student's department has no mentors");
      }

      const mentorOrder = input.mentorList.map((mentorId) => {
        const mentor = mentors.find((mentor) => mentor.id === mentorId);

        if (!mentor) {
          throw new Error("Mentor not found");
        }

        return mentor;
      });

      await ctx.db.mentorList.update({
        where: {
          teamId: student.teamId,
        },
        data: {
          order: input.mentorList,
        },
      });

      return mentorOrder;
    }),
});
