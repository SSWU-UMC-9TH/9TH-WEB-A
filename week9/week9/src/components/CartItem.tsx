import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import type { CartItem as CartItemType } from '../constants/cartItems'; 
import { useAppDispatch } from '../hooks/useCustomRedux'; 
import { increase, decrease, removeItem } from '../cart/cartSlice'; 

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const priceNum = parseInt(item.price, 10);
  const totalItemPrice = (priceNum * item.amount).toLocaleString('ko-KR');

  return (
    <article className="flex p-4 bg-white border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition duration-150">
      
      <div className="flex-shrink-0 w-24 h-24 mr-4">
        <img 
          src={item.img} 
          alt={item.title} 
          className="w-full h-full object-cover rounded-md shadow-md" 
        />
      </div>

      <div className="flex-grow pr-4">
        <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
        <p className="text-sm text-gray-500">{item.singer}</p>
        
        <p className="text-md text-green-600 font-semibold mt-1">
          {priceNum.toLocaleString('ko-KR')}원
        </p>
        
        <button
          className="text-sm text-red-500 hover:text-red-700 mt-2 transition duration-150 font-medium"
          onClick={() => dispatch(removeItem(item.id))} 
        >
          제거
        </button>
      </div>

      <div className="flex flex-col justify-start items-center ml-auto">
        <div className="flex items-center space-x-1 border border-gray-300 rounded-md p-1">
          
          <button
            className="text-gray-600 hover:text-red-500 p-1"
            onClick={() => dispatch(decrease(item.id))}
          >
            <FaChevronDown size={14} />
          </button>
          
          <p className="text-md font-semibold w-6 text-center">{item.amount}</p>

          <button
            className="text-gray-600 hover:text-green-500 p-1"
            onClick={() => dispatch(increase(item.id))}
          >
            <FaChevronUp size={14} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default CartItem;