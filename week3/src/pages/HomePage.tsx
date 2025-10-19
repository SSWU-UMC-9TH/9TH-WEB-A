import { Outlet, Link, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const HomePage = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/"; // ✅ "/"일때만 문구 보이게

  return (
    <>
      <Navbar />

      {isHome && (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center animate-fade-in">
          <h1 className="text-3xl font-bold mb-4">
            🍿 오늘은 어떤 영화를 보고 싶으세요?
          </h1>
          <p className="text-gray-500 mb-6 opacity-80 transition-opacity duration-500 hover:opacity-100">
            카테고리를 선택하거나 인기 영화부터 둘러보세요.
          </p>
          <Link
            to="/movies/popular"
            className="bg-[#b2dab1] text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            인기 영화 보러가기 →
          </Link>
        </div>
      )}

      <Outlet />
    </>
  );
};

export default HomePage;