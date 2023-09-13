import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStateContext } from '../../contexts/ContextProvider';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, removeToken } = useStateContext();

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
        <span className="text-xl">
          Hi, {user?.name || '-'}!
        </span>
        <button
          onClick={onSignOutClick}
          className="
            bg-cyan-500
            text-white
            rounded
            px-4 py-2
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
