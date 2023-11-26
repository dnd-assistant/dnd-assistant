import { router as trpcRouter } from '../../trpc';
import { register } from './register';
import { login } from './login';

export const router = trpcRouter({
  login,
  register,
});
