// import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { miniProjectRouter } from "./routers/miniproject";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  miniProject: miniProjectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
