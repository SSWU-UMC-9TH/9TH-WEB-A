import { useCartActions } from "../../hooks/useCartStore";
import { useModalStore } from "../../hooks/useModalStore";

const CartClearModal = () => {
  const { isOpen, modalType, closeModal } = useModalStore();
  const { clearCart } = useCartActions();

  if (!isOpen || modalType !== "clearCartConfirm") return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeModal}
      />

      <div className="relative z-10 bg-white rounded-lg p-6 w-80 shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-center">
          정말로 장바구니를 비우시겠어요?
        </h2>

        <div className="flex justify-between gap-4 mt-6">
          <button
            className="flex-1 py-2 rounded bg-gray-300"
            onClick={closeModal}
          >
            아니요
          </button>

          <button
            className="flex-1 py-2 rounded bg-red-500 text-white"
            onClick={() => {
              clearCart();
              closeModal();
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
