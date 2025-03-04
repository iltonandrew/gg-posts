import { publicProcedure, router, protectedProcedure } from "./trpc";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const appRouter = router({
  getPosts: publicProcedure.query(async ({ ctx }) => {
    return await db.query.posts.findMany({
      with: {
        user: true,
      },
    });
  }),

  getUsers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.user.findMany();
  }),

  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(schema.posts)
        .values({
          ...input,
          userId: ctx.session!.user.id,
        })
        .returning();
    }),

  deletePost: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.posts)
        .where(eq(schema.posts.id, input.id))
        .returning();
    }),
});

export type AppRouter = typeof appRouter;
