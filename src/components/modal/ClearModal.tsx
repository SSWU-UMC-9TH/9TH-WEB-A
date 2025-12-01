import { useDispatch, useSelector } from "../../hooks/useCustomRedux";
import { clearCart } from "../../slices/cart/cartSlice";
import { closeModal } from "../../slices/modal/modalSlice";

const CartClearModal = () => {
  const dispatch = useDispatch();

  const { isOpen, modalType } = useSelector((state) => state.modal);

  if (!isOpen) return null;
  if (modalType !== "clearCartConfirm") return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => dispatch(closeModal())}
      />

      <div className="relative z-10 bg-black rounded-lg p-6 w-80 shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-center text-pink-500">
          정말로 장바구니를 비우시겠어요?
        </h2>

        <div className="flex justify-between gap-4 mt-6">
          <button
            className="flex-1 py-2 rounded bg-pink-500 text-black font-bold hover:bg-pink-600 transition-colors"
            onClick={() => dispatch(closeModal())}
          >
            아니요
          </button>

          <button
            className="flex-1 py-2 rounded bg-black text-pink-500 font-bold border-2 border-pink-500 hover:bg-pink-500 hover:text-black transition-colors"
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartClearModal;
