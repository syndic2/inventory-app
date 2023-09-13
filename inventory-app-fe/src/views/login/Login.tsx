import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface AuthLoginDataProps {
  username?: string;
  password?: string;
}

const Login = () => {
  const [autLoginData, setAuthLoginData] = useState<AuthLoginDataProps | undefined>({
    username: '',
    password: ''
  });

  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthLoginData(prevState => ({
      ...prevState,
      [event.target.name]: [event.target.value]
    }));
  }, []);

  const onLoginClick = useCallback(() => {
  }, []);

  return (
    <div className="bg-white w-96 p-8">
      <div className="text-center">
        <span className="text-xl font-bold">
          Login Into Your Account
        </span>
      </div>
      <div className="flex flex-col gap-y-4 mt-6">
        <input
          type={'text'}
          name={'username'}
          placeholder={'Username'}
          value={autLoginData?.username}
          onChange={onInputChange}
          className="
            outline-0
            border-2
            border-neutral-200
            rounded
            focus:border-cyan-500
            transition
            duration-200
            w-full
            p-2
          "
        />
        <input
          type={'password'}
          name={'password'}
          placeholder={'Password'}
          value={autLoginData?.password}
          onChange={onInputChange}
          className="
            outline-0
            border-2
            border-neutral-200
            rounded
            focus:border-cyan-500
            transition
            duration-200
            w-full
            p-2
          "
        />
        <button
          onClick={onLoginClick}
          className="
          bg-cyan-500
          text-white rounded
          hover:bg-cyan-600
          transition
          duration-150
          p-3"
        >
          Login
        </button>
      </div>
      <div className="flex justify-center gap-x-2 mt-4">
        <span className="text-slate-950">
          Not registered?
        </span>
        <Link to="/sign-up" className="text-cyan-500 font-semibold">
          Create an account.
        </Link>
      </div>
    </div>
  );
};

export default Login;
