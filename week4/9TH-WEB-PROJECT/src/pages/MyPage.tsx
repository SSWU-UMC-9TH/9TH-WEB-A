import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout, accessToken } = useAuth();
  const [user, setUser] = useState<ResponseMyInfoDto["data"] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      const response = await getMyInfo();
      setUser(response.data);
    } catch (error) {
      console.error("유저 정보를 불러오지 못했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    fetchUserInfo();
  }, [accessToken]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {user ? (
        <>
          <h1 className="text-2xl font-bold mb-3">
            {user.name}님 환영합니다.
          </h1>

          {user.avatar && (
            <img
              src={user.avatar as string}
              alt="프로필 이미지"
              className="w-24 h-24 rounded-full mb-3 object-cover border border-gray-200"
            />
          )}

          <h2 className="text-gray-700 mb-6">{user.email}</h2>

          <button
            onClick={handleLogout}
            className="cursor-pointer bg-blue-600 text-white rounded-md px-6 py-2 text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            로그아웃
          </button>
        </>
      ) : (
        <p className="text-gray-500">유저 정보를 불러오지 못했습니다.</p>
      )}
    </div>
  );
};

export default MyPage;