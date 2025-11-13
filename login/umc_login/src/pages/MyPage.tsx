import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const { accessToken, logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) return;

    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
      setData(response);
    };

    getData();
  }, [accessToken]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div>
      <h1>{data?.data?.name}님 환영합니다</h1>
      <img src={data?.data?.avatar as string} alt="구글 로고" />
      <h1>{data?.data?.email}</h1>
      <button
        onClick={handleLogout}
        className="cursor-pointer rounded bg-[#343A40] px-4 py-2 text-white hover:bg-[#212529]"
      >
        로그아웃
      </button>
    </div>
  );
};
export default MyPage;
