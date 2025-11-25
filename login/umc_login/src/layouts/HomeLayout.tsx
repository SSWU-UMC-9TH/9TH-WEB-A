import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import WithdrawalModal from "../components/modals/WithdrawalModal";
import { LpAddButton } from "../components/buttons/AddLpButton";

import { deleteUser } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import useSidebar from "../hooks/useSidebar";

const HomeLayout = () => {
  const {
    isOpen: sidebarOpen,
    open: openSidebar,
    close: closeSidebar,
    toggle: toggleSidebar,
  } = useSidebar();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const { mutate: withdrawMutate, isPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      alert("탈퇴되었습니다.");
      logout();
      navigate("/");
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error("탈퇴 실패:", error);
      alert("탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.");
      setIsModalOpen(false);
    },
  });

  const handleWithdrawConfirm = () => {
    withdrawMutate();
  };

  return (
    <div className="h-dvh flex flex-col bg-[#fff] text-[#000]">
      <Navbar toggleSidebar={toggleSidebar} />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        onWithdrawClick={() => setIsModalOpen(true)}
      />

      <main className="flex-1 pt-16 overflow-y-auto">
        <Outlet />

        <div className="fixed bottom-6 right-6 z-20">
          <LpAddButton />
        </div>
      </main>

      <Footer />

      <WithdrawalModal
        isOpen={isModalOpen}
        onClose={() => !isPending && setIsModalOpen(false)}
        onConfirm={handleWithdrawConfirm}
        isLoading={isPending}
      />
    </div>
  );
};

export default HomeLayout;
