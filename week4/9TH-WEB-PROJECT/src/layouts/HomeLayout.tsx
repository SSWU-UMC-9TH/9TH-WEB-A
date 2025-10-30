import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <nav className="h-14 flex items-center justify-center border-b border-gray-200 shadow-sm">
        <span className="text-sm text-gray-500">네비게이션</span>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4">
        <Outlet />
      </main>

      <footer className="h-12 flex items-center justify-center border-t border-gray-200 text-gray-400 text-sm">
        푸터
      </footer>
    </div>
  );
};

export default HomeLayout;