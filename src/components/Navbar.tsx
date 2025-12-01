import { FaShoppingCart } from "react-icons/fa";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import { useEffect } from "react";

const Navbar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

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
