import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';

import AxiosClient from '../../libs/axios-client';
import SweetAlert from '../../libs/sweet-alert';
import { useStateContext } from '../../contexts/ContextProvider';
import useApiIndicator from '../../hooks/api-indicator';

import { BaseResponse } from '../../api/commons/base-response';
import { LoginBody } from '../../api/contracts/login/login.body';
import { LoginResponse } from '../../api/contracts/login/login.res';
import { LoginError } from '../../api/contracts/login/login.error';

import InputMemo from '../../components/input/Input';
import ButtonMemo from '../../components/button/Button';

interface AuthLoginDataProps {
  username?: string;
  password?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, saveToken } = useStateContext();
  const { isSubmit, setIsSubmit } = useApiIndicator();

  const [authLoginData, setAuthLoginData] = useState<AuthLoginDataProps | undefined>({
    username: '',
    password: ''
  });
  const [authLoginErrors, setAuthLoginErrors] = useState<LoginError | undefined>();

  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthLoginData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }, []);

  const onLoginClick = useCallback(async () => {
    try {
      setIsSubmit(true);
      setAuthLoginErrors(undefined);

      const payload: LoginBody = {
        username: authLoginData?.username,
        password: authLoginData?.password
      };
      const { data: { message, data } } = await AxiosClient.post<BaseResponse<LoginResponse>>('/auth/login', payload);
      if (data) {
        SweetAlert.fire({
          icon: 'success',
          text: message || '-',
          didClose: () => {
            setUser(data.user);
            saveToken(data.token || null);
            setIsSubmit(false);
            navigate('/dashboard');
          }
        });
      }
    } catch (error: any) {
      const err = error as AxiosError<{ message: string, errors: any }>;
      const { response } = err;

      if (response) {
        if (response.status === 422) {
          const { errors } = response.data;

          setAuthLoginErrors(prevState => ({
            ...prevState,
            ...errors.username && { username: response.data.errors.username },
            ...errors.password && { password: response.data.errors.password }
          }));
        }

        SweetAlert.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message
        });
      }
    } finally {
      setIsSubmit(false);
    }
  }, [authLoginData, setUser, saveToken, navigate]);

  return (
    <div className="bg-white w-96 p-8">
      <div className="text-center">
        <span className="text-xl font-bold">
          Login Into Your Account
        </span>
      </div>
      <div className="flex flex-col gap-y-4 mt-6">
        {/* Username */}
        <InputMemo
          isLoading={isSubmit}
          isDisabled={isSubmit}
          type={'text'}
          name={'username'}
          placeholder={'Username'}
          value={authLoginData?.username}
          onChange={onInputChange}
          error={authLoginErrors?.username}
        />

        {/* Password */}
        <InputMemo
          isLoading={isSubmit}
          isDisabled={isSubmit}
          type={'password'}
          name={'password'}
          placeholder={'Password'}
          value={authLoginData?.password}
          onChange={onInputChange}
          error={authLoginErrors?.password}
        />

        <ButtonMemo
          isLoading={isSubmit}
          isDisabled={isSubmit}
          label={'Login'}
          onClick={onLoginClick}
        />
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
