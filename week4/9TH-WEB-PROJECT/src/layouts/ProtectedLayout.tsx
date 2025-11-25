import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import useSidebar from "../hooks/useSidebar";

export default function ProtectedLayout() {
  const { accessToken } = useAuth();
  const location = useLocation();

  const { isOpen, toggle, close } = useSidebar(false);

  const isLoggedIn = Boolean(accessToken);

  if (!isLoggedIn) {
    alert("로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar isOpen={isOpen} close={close} />

      <div className="flex flex-col flex-1">
        <Header toggleSidebar={toggle} />
        
        <main className="flex-1 overflow-y-auto p-6 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}