import { useCartInfo } from "../hooks/useCartStore";
import CartItem from "./CartItem";

const CartList = () => {
  const { cartItems } = useCartInfo();

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-black py-8 px-4">
      <h2 className="text-3xl font-bold text-pink-500 mb-6">My Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-white text-lg">장바구니가 비어있습니다</p>
      ) : (
        <ul className="w-full max-w-3xl flex flex-col gap-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} lp={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartList;
