import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(accessToken);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-zinc-900 border-b border-zinc-800 text-white relative">
      
      <button 
          className="text-white text-2xl p-2 z-50 hover:text-pink-500 transition duration-150 md:hidden absolute left-2"
          onClick={toggleSidebar}
          aria-label="Toggle Menu"
      >
          ☰
      </button>

      <h1
        onClick={() => navigate("/")}
        className="text-pink-500 font-bold text-xl cursor-pointer ml-10 md:ml-0" 
      >
        DOLIGO
      </h1>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            {<span>도라님 반갑습니다.</span>}
            <button
              onClick={logout}
              className="border border-gray-600 px-3 py-1 rounded-md hover:bg-gray-800"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>로그인</button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-pink-500 px-3 py-1 rounded-md"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  );
}