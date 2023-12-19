import { publicProcedure } from '../../trpc';
import { z } from 'zod';
import * as services from '@dnd-assistant/api-services';
import {
  InvalidCredentialsError,
  UserNoPasswordError,
  UserNotFoundError,
} from '@dnd-assistant/api-services';
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
      if (
        e instanceof UserNoPasswordError
      ) {
        throw new TRPCError({
          message: 'User does not have a password set. Try using an alternative credential provider.',
          code: 'FORBIDDEN',
        });
      }
      if (
        e instanceof UserNotFoundError ||
        e instanceof InvalidCredentialsError
      ) {
        throw new TRPCError({
          message: 'Credentials provided do not match what was stored.',
          code: 'BAD_REQUEST',
        });
      }
      throw e;
    }
  });
