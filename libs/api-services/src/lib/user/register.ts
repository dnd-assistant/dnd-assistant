import { UserAlreadyExistError } from '../error';
import { generateSessionExpiry } from '../session/generate-session-expiry';
import { generateSessionToken } from '../session/generate-session-token';
import { generatePasswordHashAndSalt } from './generatePasswordHashAndSalt';
import { prisma } from '@dnd-assistant/prisma';

export const register = async (email: string, password: string) => {
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    throw new UserAlreadyExistError();
  }

  const { hash, salt, version } = await generatePasswordHashAndSalt(password);

  const user = await prisma.user.create({
    data: {
      passwordHash: hash,
      passwordSalt: salt,
      passwordVersion: version,
      email,
      sessions: {
        create: [
          {
            token: generateSessionToken(),
            expiresAt: generateSessionExpiry(),
          },
        ],
      },
    },
    include: {
      sessions: true,
    },
  });

  return user.sessions[0].token;
};
