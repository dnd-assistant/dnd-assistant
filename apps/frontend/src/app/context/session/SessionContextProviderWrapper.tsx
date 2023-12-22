import { ReactNode, useCallback, useState } from 'react';
import { SessionContext } from './SessionContext';
import { SESSION_ITEM_NAME } from './types';

interface Props {
  children: ReactNode;
}

export const SessionContextProviderWrapper = ({
  children,
}: Props): JSX.Element => {
  const [session, setSession] = useState(
    localStorage.getItem(SESSION_ITEM_NAME)
  );

  const setAndPersistSession = useCallback(
    (newSession: string | null) => {
      setSession(newSession);
      if (newSession) {
        localStorage.setItem(SESSION_ITEM_NAME, newSession);
      } else {
        localStorage.removeItem(SESSION_ITEM_NAME);
      }
    },
    [setSession]
  );

  return (
    <SessionContext.Provider
      value={{ session, setSession: setAndPersistSession }}
    >
      {children}
    </SessionContext.Provider>
  );
};
