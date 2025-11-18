import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 문제가 발생했습니다.");
    },
  });
};
