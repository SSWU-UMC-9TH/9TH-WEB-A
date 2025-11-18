import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useLogout } from "../hooks/mutations/useLogout";

type NavbarProps = {
  toggleSidebar: () => void;
};

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const { mutate: logoutMutation } = useLogout();

  const { data } = useQuery<ResponseMyInfoDto>({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        logout();
        navigate("/");
      },
      onError: (error) => {
        console.error("로그아웃 실패", error);
        alert("로그아웃 중 문제가 발생했습니다.");
        logout();
        navigate("/");
      },
    });
  };

  return (
    <nav className="bg-[#FF69B4] text-[#212529] fixed w-full z-10 shadow-md">
      <div className="flex items-center justify-between p-4 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center rounded-md p-1 hover:bg-black/10 transition-colors"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M7.95 11.95h32m-32 12h32m-32 12h32"
              />
            </svg>
          </button>
          <Link to="/" className="text-xl font-bold">
            BAKA LP
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          {!accessToken ? (
            <>
              <Link
                to="/login"
                className="font-medium hover:opacity-70 transition-opacity"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="font-medium hover:opacity-70 transition-opacity"
              >
                회원가입
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/mypage"
                className="flex items-center gap-2 font-semibold hover:opacity-70 transition-opacity"
              >
                <img
                  src={data?.data?.avatar || "/default-profile.png"}
                  alt="프로필"
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#212529]"
                />
                <span>{data?.data?.name}님</span>
              </Link>
              <button
                className="font-medium hover:opacity-70 transition-opacity"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
