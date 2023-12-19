import * as trpcExpress from '@trpc/server/adapters/express';

import { inferAsyncReturnType } from '@trpc/server';

export const createContext = (
  expressContext: trpcExpress.CreateExpressContextOptions
) => {
  console.log('Request headers', expressContext.req.headers);
  return {};
};

export type Context = inferAsyncReturnType<typeof createContext>;
