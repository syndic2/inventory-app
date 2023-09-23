import { Outlet, Navigate } from 'react-router-dom';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { useStateContext } from '../../contexts/ContextProvider';

const DefaultLayout: React.FC = () => {
  const { token } = useStateContext();

  if (!token) return <Navigate to="/login" />

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex flex-col w-full">
        <Header />
        <div className="bg-neutral-100 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DefaultLayout;
