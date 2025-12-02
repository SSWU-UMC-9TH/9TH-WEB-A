import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useCustomRedux'; 
import { clearCart, calculateTotals } from '../cart/cartSlice'; 
import CartItem from './CartItem';

const CartContainer: React.FC = () => {
  const { cartItems, amount, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]); 

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      
      <section className="container mx-auto p-4 max-w-4xl flex-grow pb-36">
        
        <header className="py-6 border-b mb-6">
          <h2 className="text-4xl font-extrabold text-center text-gray-800">나의 장바구니 🛒</h2>
        </header>

        <div className="shadow-xl rounded-lg overflow-hidden border border-gray-100">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        
        <div className="mt-10 pt-6 border-t-4 border-gray-200 mb-10">
            <h4 className="flex justify-between text-2xl font-bold mb-4 text-gray-900">
                <span>총 수량:</span>
                <span className="text-green-600">{amount} 개</span>
            </h4>
            <h4 className="flex justify-between text-3xl font-bold text-gray-900">
                <span>총 금액:</span>
                <span className="text-red-500">{total.toLocaleString('ko-KR')} 원</span>
            </h4>
        </div>
      
      </section>
      
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 md:p-6 z-20">
        <div className="container mx-auto max-w-4xl flex justify-center">
            <button
                className="px-8 py-3 w-full max-w-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 shadow-lg font-semibold text-xl"
                onClick={() => dispatch(clearCart())}
            >
                전체 삭제
            </button>
        </div>
      </footer>
    </div>
  );
};

export default CartContainer;