import { Link } from "react-router-dom";
import { X } from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* 모바일 오버레이 */}
      <div
        className={`fixed inset-0 bg-black/50 z-0 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-black text-white shadow-lg z-20
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0 " : "-translate-x-full"}
        `}
      >
        <div className="flex justify-end p-4">
          <button onClick={onClose}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* 메뉴 */}
        <div className="flex flex-col items-start gap-4 px-6 mt-4">
          <Link
            to="/my"
            className="hover:underline w-full"
            onClick={onClose}
          >
            마이페이지
          </Link>
          <Link
            to="/search"
            className="hover:underline w-full"
            onClick={onClose}
          >
            🔍 검색
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;