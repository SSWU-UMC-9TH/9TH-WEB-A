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
    <div className="flex justify-between items-center p-4 bg-[#212529] text-white">
      <h1
        onClick={() => {
          window.location.href = '/';
        }}
        className="text-2xl font-semibold"
      >
        MOCA PlayList
      </h1>
      <div className="flex items-center space-x-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </div>
  )
}

export default Navbar;
