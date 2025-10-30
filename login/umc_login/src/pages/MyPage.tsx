import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        console.log(response);
        setData(response);
      } catch (error) {
        console.error("내 정보 불러오기 오류:", error);
      }
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>{data?.data?.name}님 환영합니다</h1>
      {data?.data?.avatar && (
        <img src={data.data.avatar as string} alt="프로필 이미지" />
      )}
      <h1>{data?.data?.email}</h1>

      <button
        onClick={handleLogout}
        className="cursor-pointer rounded bg-blue-300 rounded-sm-p-5 hover:scale-90"
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
