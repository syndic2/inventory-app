import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface AuthSignUpDataProps {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUp = () => {
  const [authSignUpData, setAuthSignUpData] = useState<AuthSignUpDataProps | undefined>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthSignUpData(prevState => ({
      ...prevState,
      [event.target.name]: [event.target.value]
    }));
  }, []);

  const onSignUpClick = useCallback(() => {
  }, []);

  return (
    <div className="bg-white w-96 p-8">
      <div className="text-center">
        <span className="text-xl font-bold">
          Sign Up New User
        </span>
      </div>
      <div className="flex flex-col gap-y-4 mt-6">
        <input
          type={'text'}
          name={'name'}
          placeholder={'Name'}
          value={authSignUpData?.name}
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
          type={'text'}
          name={'email'}
          placeholder={'Email'}
          value={authSignUpData?.email}
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
          type={'text'}
          name={'username'}
          placeholder={'Username'}
          value={authSignUpData?.username}
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
          value={authSignUpData?.password}
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
          name={'confirmPassword'}
          placeholder={'Confirm Password'}
          value={authSignUpData?.confirmPassword}
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
          onClick={onSignUpClick}
          className="
          bg-cyan-500
          text-white rounded
          hover:bg-cyan-600
          transition
          duration-150
          p-3"
        >
          Sign Up
        </button>
      </div>
      <div className="flex justify-center gap-x-2 mt-4">
        <span className="text-slate-950">
          Already have an account?
        </span>
        <Link to="/login" className="text-cyan-500 font-semibold">
          Login now.
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
