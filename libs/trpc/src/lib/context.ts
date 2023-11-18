import * as trpcExpress from '@trpc/server/adapters/express';

import { inferAsyncReturnType } from '@trpc/server';

export const createContext = ({}: trpcExpress.CreateExpressContextOptions) => {
  return {};
};

export type Context = inferAsyncReturnType<typeof createContext>;
