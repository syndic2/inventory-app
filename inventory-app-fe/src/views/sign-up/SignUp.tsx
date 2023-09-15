import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';

import axiosClient from '../../libs/axios-client';
import { useStateContext } from '../../contexts/ContextProvider';
import useApiIndicator from '../../hooks/api-indicator';

import { BaseResponse } from '../../api/commons/base-response';
import { RegisterBody } from '../../api/contracts/register/register.body';
import { RegisterResponse } from '../../api/contracts/register/register.response';
import { RegisterError } from '../../api/contracts/register/register.error';

import InputMemo from '../../components/input/Input';
import ButtonMemo from '../../components/button/Button';

interface AuthSignUpDataProps {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const { setUser, saveToken } = useStateContext();
  const { isSubmit, setIsSubmit } = useApiIndicator();

  const [authSignUpData, setAuthSignUpData] = useState<AuthSignUpDataProps>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [authSignUpErrors, setAuthSignUpErrors] = useState<RegisterError | undefined>();

  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthSignUpData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }, []);

  const onSignUpClick = useCallback(async () => {
    try {
      setIsSubmit(true);
      setAuthSignUpErrors(undefined);

      const { name, email, username, password, confirmPassword } = authSignUpData;
      const payload: RegisterBody = {
        name,
        email,
        username,
        password,
        password_confirmation: confirmPassword
      };

      const { data: { data } } = await axiosClient.post<BaseResponse<RegisterResponse>>('/sign-up', payload);
      if (data) {
        setUser(data.user);
        saveToken(data.token || null);
        navigate('/dashboard');
      }
    } catch (error) {
      setIsSubmit(false);

      const err = error as AxiosError<{ errors: any }>;
      const { response } = err;

      if (response) {
        const errors = response.data.errors;

        if (response.status === 422) setAuthSignUpErrors(prevState => ({
          ...prevState,
          ...errors.name && { name: errors.name[0] },
          ...errors.email && { email: errors.email[0] },
          ...errors.username && { username: errors.username[0] },
          ...errors.password && {
            password: errors.password[0],
            confirm_password: errors.password[0]
          }
        }));
      }
    }
  }, [authSignUpData, setUser, saveToken]);

  return (
    <div className="bg-white w-96 p-8">
      <div className="text-center">
        <span className="text-xl font-bold">
          Sign Up New User
        </span>
      </div>
      <div className="flex flex-col gap-y-6 mt-6">
        {/* Name */}
        <InputMemo
          isLoading={isSubmit}
          isDisabled={isSubmit}
          type={'text'}
          name={'name'}
          placeholder={'Name'}
          value={authSignUpData.name}
          onChange={onInputChange}
          error={authSignUpErrors?.name}
        />

        {/* Email */}
        <InputMemo
          isLoading={isSubmit}
          isDisabled={isSubmit}
          type={'text'}
          name={'email'}
          placeholder={'Email'}
          value={authSignUpData.email}
          onChange={onInputChange}
          error={authSignUpErrors?.email}
        />

        {/* Username */}
        <InputMemo
          isLoading={isSubmit}
          isDisabled={isSubmit}
          type={'text'}
          name={'username'}
          placeholder={'Username'}
          value={authSignUpData.username}
          onChange={onInputChange}
          error={authSignUpErrors?.username}
        />

        {/* Password */}
        <InputMemo
          isLoading={isSubmit}
          isDisabled={isSubmit}
          type={'password'}
          name={'password'}
          placeholder={'Password'}
          value={authSignUpData.password}
          onChange={onInputChange}
          error={authSignUpErrors?.password}
        />

        {/* Confirm Password */}
        <InputMemo
          isLoading={isSubmit}
          isDisabled={isSubmit}
          type={'password'}
          name={'confirmPassword'}
          placeholder={'Confirm Password'}
          value={authSignUpData.confirmPassword}
          onChange={onInputChange}
          error={authSignUpErrors?.confirm_password}
        />

        <ButtonMemo
          isLoading={isSubmit}
          isDisabled={isSubmit}
          label={'Sign Up'}
          onClick={onSignUpClick}
        />
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
