import * as trpcExpress from '@trpc/server/adapters/express';

import { inferAsyncReturnType } from '@trpc/server';

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return { req, res };
};

export type Context = inferAsyncReturnType<typeof createContext>;
