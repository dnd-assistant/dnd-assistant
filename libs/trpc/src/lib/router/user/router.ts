import { router as trpcRouter } from '../../trpc';
import { register } from './register';
import { login } from './login';
import { signInWithGoogle } from './signInWithGoogle';

export const router = trpcRouter({
  login,
  register,
  signInWithGoogle,
});
