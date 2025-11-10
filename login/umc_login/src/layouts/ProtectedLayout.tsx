import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef } from "react";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const hasChecked = useRef(false);
  useEffect(() => {
    if (!accessToken && !hasChecked.current) {
      hasChecked.current = true;
      const ok = window.confirm(
        "로그인이 필요한 서비스입니다. 로그인 화면으로 이동하시겠습니까?"
      );
      if (ok) navigate("/login");
    }
  }, [accessToken, navigate]);

  if (!accessToken) return null;

  return <Outlet />;
};
export default ProtectedLayout;
