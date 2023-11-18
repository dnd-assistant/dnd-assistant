import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@dnd-assistant/trpc';

export const trpc = createTRPCReact<AppRouter>();
