import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => ({
      session: await auth.api.getSession({ headers: req.headers }),
      db,
    }),
  });

export { handler as GET, handler as POST };
