import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import { z, ZodError } from "zod";
import { headers } from "next/headers";
import { db } from "@/db";

import { auth, type Session } from "@/lib/auth";

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;

interface CreateContextOptions {
  session: Session | null;
}

const createInnerTRPCContext = async (opts: CreateContextOptions) => {
  return {
    db,
    session: opts.session,
  };
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  // Get the session from the server using the getServerSession wrapper function
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return createInnerTRPCContext({
    session,
  });
};

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { session: { ...ctx.session, user: ctx.session.user } } });
});
