type WithdrawalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function WithdrawalModal({
  isOpen,
  onClose,
  onConfirm,
}: WithdrawalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#FF1493] w-80 rounded-2xl p-6 text-center shadow-2xl border-4 border-black">
        <p className="text-lg font-bold text-white mb-6">
          정말 탈퇴하시겠습니까?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-black text-[#FF1493] font-semibold py-2 rounded-xl hover:bg-[#000000cc] transition-colors"
          >
            예
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-white text-[#FF1493] font-semibold py-2 rounded-xl hover:bg-[#ffe0f0] transition-colors"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
}
