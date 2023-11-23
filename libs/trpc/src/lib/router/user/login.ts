import { publicProcedure } from '../../trpc';
import { z } from 'zod';
import * as services from '@dnd-assistant/api-services';
import { InvalidCredentialsError, UserNotFoundError } from '@dnd-assistant/api-services';
import { TRPCError } from '@trpc/server';
import { validateEmail, validatePassword } from '@dnd-assistant/shared-utils';

export const login = publicProcedure
.input(
    z.object({
      email: z.string().refine(validateEmail),
      password: z.string().refine(validatePassword),
    })
  )
.mutation(async ({ ctx, input }) => {
  const { email, password } = input;
  try {
    const sessionToken = await services.login(email, password);
    return sessionToken;
  } catch (e) {
    if (e instanceof UserNotFoundError) {
      return new TRPCError({
        message: 'User not found for the provided email',
        code: "NOT_FOUND",
      });
    } if (e instanceof InvalidCredentialsError) {
      return new TRPCError({
        message: 'Password provided does not match what\'s stored',
        code: "BAD_REQUEST",
      });
    }
    throw e;
  }
});
