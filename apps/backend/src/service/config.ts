const getEnvOrThrow = (name: string) => {
  const envVar = process.env[name];
  if (!envVar) throw new Error(`Environment variable ${name} does not exist`);
  return envVar;
}

export const config = {
  google: {
    oauthClientId: getEnvOrThrow('GOOGLE_API_CLIENT_ID'),
  }
}
