import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-cyan-500 p-8">
      <div className="flex flex-col items-center gap-y-8">
        <Link to="/dashboard" className="text-white">
          <span className="px-6 py-2 transition duration-150 hover:bg-cyan-600 rounded">
            Dashboard
          </span>
        </Link>
        <Link to="/product" className="text-white">
          <span className="px-6 py-2 transition duration-150 hover:bg-cyan-600 rounded">
            Product
          </span>
        </Link>
        <Link to="/purchase" className="text-white">
          <span className="px-6 py-2 transition duration-150 hover:bg-cyan-600 rounded">
            Purchase
          </span>
        </Link>
        <Link to="/sales" className="text-white">
          <span className="px-6 py-2 transition duration-150 hover:bg-cyan-600 rounded">
            Sales
          </span>
        </Link>
        <Link to="/history-transaction" className="text-white">
          <div className="text-center px-6 py-2 transition duration-150 hover:bg-cyan-600 rounded">
            History Transaction
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
