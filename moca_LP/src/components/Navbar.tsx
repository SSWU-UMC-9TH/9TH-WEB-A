import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLogout } from "../hooks/mutations/useLogout";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

type NavbarProps = {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { data } = useGetMyInfo(accessToken);
   const { mutate: logoutMutation } = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation();
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <nav className="bg-[#343A40] text-[#E9ECEF] fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="text-white flex items-center justify-center"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
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

          <Link
            to="/"
            className="text-xl font-bold text-white"
          >
            MOCA LP
          </Link>
        </div>

        
        <div className="space-x-6">
          {!accessToken && (
            <>
              <Link
                to="/login"
                className="hover:underline"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="hover:underline"
              >
                회원가입
              </Link>
            </>
          )}
          {accessToken && (
            <div className="flex justify-between gap-4">
              <h2>{data?.data?.name}님, 반갑습니다</h2>
              <button
                className="hover:underline"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
          )}
        </div>

      </div>
    </nav>
  )
};

export default Navbar;