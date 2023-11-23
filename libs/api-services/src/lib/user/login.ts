import { prisma } from "@dnd-assistant/prisma";
import { hashPassword } from "./password";
import { InvalidCredentialsError, UserNotFoundError } from "../error";
import { generateSessionToken } from "../session/generate-session-token";
import { generateSessionExpiry } from "../session/generate-session-expiry";

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    }
  });

  if (!user) {
    throw new UserNotFoundError();
  }

  const hash = await hashPassword(password, user.passwordSalt);

  if (hash !== user.passwordHash) {
    throw new InvalidCredentialsError();
  }

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      token: generateSessionToken(),
      expiresAt: generateSessionExpiry(),
    }
  });

  return session.token;
}
