import { prisma } from "@dnd-assistant/prisma";
import { generateSessionToken } from "./generate-session-token";
import { generateSessionExpiry } from "./generate-session-expiry";

export const generateSession = async (userId: string) => {

  const session = await prisma.session.create({
    data: {
      userId: userId,
      token: generateSessionToken(),
      expiresAt: generateSessionExpiry(),
    }
  });
  return session;
};
