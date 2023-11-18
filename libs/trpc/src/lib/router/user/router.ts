import { router as trpcRouter } from '../../trpc';
import { register } from './register';

export const router = trpcRouter({
  register,
});
