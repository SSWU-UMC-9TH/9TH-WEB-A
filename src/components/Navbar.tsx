import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { useEffect } from "react";
import { calculateTotals } from "../slices/cart/cartSlice";

const Navbar = () => {
  const { amount, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);

  return (
    <nav className="flex justify-between items-center p-4 bg-pink-500 text-black shadow-md">
      <h1
        onClick={() => (window.location.href = "/")}
        className="text-2xl font-bold cursor-pointer hover:opacity-80 transition"
      >
        BAKA PlayList
      </h1>

      <div className="flex items-center space-x-2">
        <div className="relative cursor-pointer group">
          <FaShoppingCart className="text-2xl" />
          {amount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-pink-500 text-xs font-bold rounded-full px-2 py-0.5">
              {amount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
