import { trpc } from '../utils/trpc';

export const Register = () => {
  const register = trpc.user.register.useMutation();

  return (
      <div>
        <p>TRPC Connected</p>

        <button onClick={() => register.mutate({ email: 'test2@test.com', password: 'testtesttest' })}>
          Sign Up
        </button>
    </div>
  );
};
