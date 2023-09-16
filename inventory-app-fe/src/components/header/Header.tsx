import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AxiosClient from '../../libs/axios-client';
import { useStateContext } from '../../contexts/ContextProvider';
import useApiIndicator from '../../hooks/api-indicator';

import { BaseResponse } from '../../api/commons/base-response';
import { GetCurrentUserResponse } from '../../api/contracts/get-current-user/get-current-user.res';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, removeToken } = useStateContext();
  const { isFetch, setIsFetch } = useApiIndicator();

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

  const onSignOutClick = useCallback(() => {
    removeToken();
    navigate('/login');
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
        <button
          onClick={onSignOutClick}
          className="
            bg-cyan-500
            text-white
            text-sm
            rounded
            px-3 py-2
            transition
            duration-150
            hover:opacity-70
          ">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Header;
