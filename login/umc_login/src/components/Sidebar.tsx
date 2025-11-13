import { Link } from "react-router-dom";
import { X, Search, User } from "lucide-react";
import { useEffect } from "react";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isOpen) {
        onClose();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-10 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#FF1493] text-white shadow-lg z-20
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-end p-4">
          <button onClick={onClose}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex flex-col items-start gap-4 px-6 mt-4">
          <Link
            to="/my"
            className="flex items-center gap-2 w-full hover:underline"
            onClick={onClose}
          >
            <User className="w-5 h-5" />
            <span>마이페이지</span>
          </Link>

          <Link
            to="/search"
            className="flex items-center gap-2 w-full hover:underline"
            onClick={onClose}
          >
            <Search className="w-5 h-5" />
            <span>검색</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
