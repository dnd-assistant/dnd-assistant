import { router, publicProcedure } from '../trpc';
import { router as userRouter } from './user/router';

export const appRouter = router({
  health: publicProcedure.query(() => {
    return {
      message: 'OK',
    };
  }),
  user: userRouter,
});

export type AppRouter = typeof appRouter;
