import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <button
        className="absolute top-4 left-4 md:hidden z-50 text-white"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static bg-zinc-900 text-white h-full w-64 p-6 z-50 transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-pink-500 font-bold mb-6 text-lg">메뉴</h2>

        <ul className="space-y-4">
          <li
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-pink-400"
          >
            홈
          </li>

          <li
            onClick={() => navigate("/my")}
            className="cursor-pointer hover:text-pink-400"
          >
            마이페이지
          </li>
        </ul>

        <button
          onClick={() => setOpen(false)}
          className="md:hidden mt-6 text-sm text-gray-400 hover:text-gray-200"
        >
          닫기
        </button>
      </aside>
    </>
  );
}