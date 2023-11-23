import { randomBytes, pbkdf2 } from 'crypto'

const PASSWORD_VERSION = 1;

export const hashPassword = async (password: string) => {
  const salt = randomBytes(128).toString("base64");
  const hash = await pbkdf2Promise(password, salt);
  return {
    hash: hash,
    salt: salt,
    version: PASSWORD_VERSION,
  };
};

const pbkdf2Promise = (password: string, salt: string): Promise<string> => {
  return new Promise<string>((success, fail) => {
    pbkdf2(password, salt, 10000, 512, "sha512", (err, hashBuff) => {
      if (err) fail(err);
      else success(hashBuff.toString("base64"));
    })
  })
};

export const validatePassword = async (password: string, hash: string, salt: string, version: number) => {
  switch (version) {
    case 1:
      return hash === await pbkdf2Promise(password, salt);
    default:
      throw new Error(`Invalid password version of ${version}`);
  }
};
