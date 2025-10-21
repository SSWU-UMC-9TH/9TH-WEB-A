import { Outlet, Link, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import HomeBackground from "../components/HomeBackground";

const HomePage = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const hideNavbar = pathname.startsWith("/movie/");

  return (
    <>
      {!hideNavbar && <Navbar />}

      {isHome && (
        <div className="relative h-screen w-full overflow-hidden">
          <HomeBackground />

          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
            <h1 className="text-3xl font-bold mb-4 leading-snug">
              🍿 오늘은 어떤 영화를 보고 싶으세요?
            </h1>
            <p className="text-gray-400 mb-6">
              카테고리를 선택하거나 인기 영화부터 둘러보세요.
            </p>
            <Link
              to="/movies/popular"
              className="bg-[#E50914] text-white px-5 py-3 rounded-lg shadow-lg 
                         transition-transform duration-300 ease-in-out"
            >
              인기 영화 구경하기 →
            </Link>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
};

export default HomePage;