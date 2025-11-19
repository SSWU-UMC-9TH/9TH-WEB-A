import { useState } from "react";
import { AddLpModal } from "../modals/AddLpModal";

export const LpAddButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        className="w-14 h-14 rounded-full bg-[#212529] text-white text-3xl shadow-lg hover:bg-[#6C757D] transition-colors"
        onClick={() => setIsOpen(true)}
      >
        +
      </button>
      {isOpen && <AddLpModal onClose={() => setIsOpen(false)} />}
    </div>
  );
};