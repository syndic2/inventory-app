import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import AxiosClient from '../../libs/axios-client';
import SweetAlert from '../../libs/sweet-alert';
import { useStateContext } from '../../contexts/ContextProvider';
import useApiIndicator from '../../hooks/api-indicator';
import { BaseResponse } from '../../api/commons/base-response';
import { GetCurrentUserResponse } from '../../api/contracts/get-current-user/get-current-user.res';

import ButtonMemo from '../button/Button';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, removeToken } = useStateContext();
  const {
    isFetch,
    setIsFetch,
    isSubmit,
    setIsSubmit
  } = useApiIndicator();

  const fetchCurrentUser = useCallback(async () => {
    try {
      setIsFetch(true);

      const { data: { data } } = await AxiosClient.get<BaseResponse<GetCurrentUserResponse>>('/users/current');
      if (data) setUser(prevState => ({
        ...prevState,
        user_id: data.user_id,
        name: data.name,
        email: data.email
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetch(false);
    }
  }, [setUser]);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const onSignOutClick = useCallback(async () => {
    try {
      setIsSubmit(true);

      const { data: { status } } = await AxiosClient.post<BaseResponse>('/auth/logout');
      if (status) {
        removeToken();
        navigate('/login');
      }
    } catch (error: any) {
      const errors = error as AxiosError<BaseResponse>;
      const { response } = errors;

      if (response) {
        SweetAlert.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message || 'Something went wrong. PLease report this to admin'
        });
      }
    } finally {
      setIsSubmit(false);
    }
  }, [navigate, removeToken]);

  return (
    <div className="
      flex
      justify-between
      items-center
      p-6
    ">
      <span className="text-2xl font-semibold">
        Inventory App
      </span>
      <div className="flex items-center gap-x-5">
        {isFetch ? (
          <div className="animate-pulse bg-gray-300 rounded w-20 h-5">
          </div>
        ) : (
          <span className="text-xl">
            Hi, {user?.name || '-'}!
          </span>
        )}
        <ButtonMemo
          isLoading={isSubmit}
          isDisabled={isSubmit}
          onClick={onSignOutClick}
          label={'Sign Out'}
        />
      </div>
    </div>
  );
};

export default Header;
