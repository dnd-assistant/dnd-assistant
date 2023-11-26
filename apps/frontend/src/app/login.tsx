import { trpc } from '../utils/trpc';

export const Login = () => {
  const login = trpc.user.login.useMutation();

  return (
      <div>
        <p>TRPC Connected</p>

        <button onClick={() => login.mutate({ email: 'test2@test.com', password: 'testtesttest' })}>
          Login
        </button>
    </div>
  );
};
