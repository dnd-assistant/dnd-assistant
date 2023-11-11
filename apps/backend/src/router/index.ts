import { router, publicProcedure } from '../trpc';

export const appRouter = router({
  health: router({
    healthcheck: publicProcedure.query(() => {
      return {
        message: 'OK'
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
