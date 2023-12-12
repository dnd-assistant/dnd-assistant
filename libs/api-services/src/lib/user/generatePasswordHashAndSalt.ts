import { randomBytes } from 'crypto';
import { pbkdf2Promise } from './pbkdf2Promise';

const PASSWORD_VERSION = 1;

export const generatePasswordHashAndSalt = async (password: string) => {
  const salt = randomBytes(128).toString('base64');
  const hash = await pbkdf2Promise(password, salt);
  return {
    hash: hash,
    salt: salt,
    version: PASSWORD_VERSION,
  };
};
