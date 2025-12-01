import type { Lp } from "../types/cart";
import { useCartActions } from "../hooks/useCartStore";

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const { increase, decrease, removeItem } = useCartActions();

  const handleIncreaseCount = () => {
    increase(lp.id);
  };

  const handleDecreaseCount = () => {
    if (lp.amount === 1) {
      removeItem(lp.id);
      return;
    }

    decrease(lp.id);
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-300 bg-black text-white shadow-md rounded-lg mb-2">
      <img
        src={lp.img}
        alt={`${lp.title}의 LP 이미지`}
        className="w-24 h-24 object-cover rounded mr-4 border-2 border-pink-500"
      />
      <div className="flex-1">
        <h3 className="text-xl font-bold text-pink-500">{lp.title}</h3>
        <p className="text-sm text-gray-300">{lp.singer}</p>
        <p className="text-sm font-semibold text-pink-500">{lp.price}원</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDecreaseCount}
          className="px-3 py-1 bg-pink-500 text-black font-bold rounded-l hover:bg-pink-500 transition-colors duration-200"
        >
          -
        </button>
        <span className="px-4 py-[3px] border-y border-pink-500">
          {lp.amount}
        </span>
        <button
          onClick={handleIncreaseCount}
          className="px-3 py-1 bg-pink-500 text-black font-bold rounded-r hover:bg-pink-500 transition-colors duration-200"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
