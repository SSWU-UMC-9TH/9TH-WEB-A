import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { LpAddButton } from "../components/buttons/AddLpButton";
import { deleteUser } from "../apis/auth";
import WithdrawalModal from "../components/modals/WithdrawalModal";
import useSidebar from "../hooks/useSidebar";

const HomeLayout = () => {
  const { isOpen: sidebarOpen, open: openSidebar, close: closeSidebar, toggle: toggleSidebar } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWithdraw = async () => {
    try {
      await deleteUser();
      alert("탈퇴되었습니다.");
      window.location.href = "/";
    } catch (error) {
      console.error("탈퇴 실패:", error);
      alert("탈퇴 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="h-dvh flex flex-col bg-[#fff] text-[#000]">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        onWithdrawClick={() => setIsModalOpen(true)}
      />
      <main className="flex-1 mt-10">
        <LpAddButton />
        <Outlet />
      </main>x
      <Footer />

      <WithdrawalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleWithdraw}
      />
    </div>
  );
};

export default HomeLayout;
