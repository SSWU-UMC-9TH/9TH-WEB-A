import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  close: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, close }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, close]);
  
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={close}
        />
      )}

      <aside
        className={`fixed md:static bg-zinc-900 text-white h-full w-64 p-6 z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0" 
        }`}
      >
        <h2 className="text-pink-500 font-bold mb-6 text-lg">메뉴</h2>

        <ul className="space-y-4">
          <li
            onClick={() => {
              navigate("/");
              close();
            }}
            className="cursor-pointer hover:text-pink-400"
          >
            홈
          </li>

          <li
            onClick={() => {
              navigate("/my");
              close();
            }}
            className="cursor-pointer hover:text-pink-400"
          >
            마이페이지
          </li>
        </ul>

        <button
          onClick={close}
          className="md:hidden mt-6 text-sm text-gray-400 hover:text-gray-200"
        >
          닫기
        </button>
      </aside>
    </>
  );
};

export default Sidebar;