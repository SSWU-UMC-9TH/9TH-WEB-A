import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { openModal } from "../slices/modal/modalSlice";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleInitializeCart = () => {
    dispatch(
      openModal({
        modalType: "clearCartConfirm",
      })
    );
  };

  return (
    <div className="p-6 flex justify-between items-center bg-black shadow-md">
      <button
        onClick={handleInitializeCart}
        className="bg-pink-500 text-black font-semibold px-4 py-2 rounded-lg hover:opacity-80 transition"
      >
        장바구니 초기화
      </button>

      <div className="bg-pink-500 text-black font-bold px-4 py-2 rounded-lg">
        총 가격: {total.toLocaleString()}원
      </div>
    </div>
  );
};

export default PriceBox;
