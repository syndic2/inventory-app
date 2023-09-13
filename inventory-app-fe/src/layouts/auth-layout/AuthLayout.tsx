import { Outlet, Navigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';

const AuthLayout = () => {
  const { token } = useStateContext();

  if (token) return <Navigate to="/dashboard" />

  return (
    <div className="bg-neutral-100 w-screen h-screen">
      <div className="flex justify-center items-center w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
