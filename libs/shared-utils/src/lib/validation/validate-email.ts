export const validateEmail = (email: string) => {
  return /@/.test(email)
};
