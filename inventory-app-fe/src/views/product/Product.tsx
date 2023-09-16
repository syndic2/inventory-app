import { Link } from 'react-router-dom';

const Product: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">
          Products
        </span>
        <Link
          to="/product/add"
          className="
            bg-green-500
            text-white
            text-sm
            rounded
            hover:bg-green-600
            transition
            duration-200
            p-2
          ">
          Add Product
        </Link>
      </div>
    </div>
  );
};

export default Product;
