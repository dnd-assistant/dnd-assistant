import { publicProcedure } from '../../trpc';
import { z } from 'zod';
import * as services from '@dnd-assistant/api-services';
import { UserAlreadyExistError } from '@dnd-assistant/api-services';
import { TRPCError } from '@trpc/server';
import { validateEmail, validatePassword } from '@dnd-assistant/shared-utils';

export const register = publicProcedure
  .input(
    z.object({
      email: z.string().refine(validateEmail),
      password: z.string().refine(validatePassword),
    })
  )
  .mutation(async ({ input }) => {
    const { email, password } = input;
    try {
      const sessionToken = await services.register(email, password);
      return sessionToken;
    } catch (e) {
      if (e instanceof UserAlreadyExistError) {
        throw new TRPCError({
          message: 'User already exists with the given email',
          code: 'CONFLICT',
        });
      }
      throw e;
    }
  });
