import { pbkdf2Promise } from './pbkdf2Promise';

export const hashPassword = async (password: string, salt: string) => {
  const hash = await pbkdf2Promise(password, salt);
  return hash;
};
