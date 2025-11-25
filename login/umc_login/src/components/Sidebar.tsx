import { Link } from "react-router-dom";
import { X, Search, User } from "lucide-react";
import { useEffect } from "react";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onWithdrawClick: () => void;
};

const navLinks = [
  { to: "/my", icon: <User className="w-5 h-5" />, label: "마이페이지" },
  { to: "/search", icon: <Search className="w-5 h-5" />, label: "검색" },
];

const Sidebar = ({ isOpen, onClose, onWithdrawClick }: SidebarProps) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isOpen) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-10 bg-black/50 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={`fixed top-0 left-0 z-20 h-full w-64 transform bg-[#FF1493] text-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex justify-end p-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Sidebar"
            className="focus:outline-none focus:ring-2 focus:ring-white rounded"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <nav className="flex flex-col gap-4 px-6 mt-4">
          {navLinks.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className="flex w-full items-center gap-2 rounded hover:underline focus:outline-none focus:ring-2 focus:ring-white"
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="px-6 mt-auto mb-10">
          <button
            type="button"
            onClick={onWithdrawClick}
            className="w-full rounded-xl bg-[#495057] px-4 py-2 text-[#CED4DA] transition hover:bg-[#ADB5BD] focus:outline-none focus:ring-2 focus:ring-white"
          >
            탈퇴하기
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
