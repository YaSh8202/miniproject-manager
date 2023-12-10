import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env.mjs";
import { db } from "@/server/db";
import { type Role } from "@prisma/client";
import { type AdapterUser } from "next-auth/adapters";
import { extractCollegeInfo } from "@/lib/utils";



/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    role: Role;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
      },
    }),
  },
  adapter: {
    ...PrismaAdapter(db),
    createUser: async (user) => {

      const mentor = await db.mentor.findUnique({
        where: {
          email: user.email
        }
      });

      if(mentor){
        const createUser = await db.user.create({
          data: {
            ...user,
            role: "MENTOR",
            mentor: {
              connect: {
                id: mentor.id
              }
            }
          },

        })
        

        return createUser as AdapterUser;
      }



      const createdUser = await db.user.create({
        data: user,
        // role: 
        
      });

      console.log("createdUser", createdUser);



      const email = createdUser.email;
      const studentInfo = extractCollegeInfo(email);
      console.log("studentInfo", studentInfo);
      if (studentInfo) {
        const { batchYear, departmentCode, entryNo } = studentInfo;

        const department = await db.department.findUnique({
          where: {
            code: departmentCode,
          },
          select: {
            batches: {
              where: {
                year: parseInt("20" + batchYear),
              },
            },
          },
        });
        const student = await db.student.create({
          data: {
            name: createdUser.name,
            mail: createdUser.email,
            user: {
              connect: {
                id: createdUser.id,
              },
            },
            batch: {
              connect: {
                id: department?.batches[0]?.id,
              },
            },
            entryNo: batchYear + departmentCode + entryNo,
          },
        });

        console.log("student",student)
      }

      

      return createdUser as AdapterUser;
    },
  },
  providers: [
    GoogleProvider({
      id: "google",
      name: "Google",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: "/sign-in"
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
