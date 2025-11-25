import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import useSidebar from "../hooks/useSidebar";

const HomeLayout = () => {
  const { isOpen, toggle, close } = useSidebar(false);

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar isOpen={isOpen} close={close} />

      <div className="flex flex-col flex-1">
        <Header toggleSidebar={toggle} /> 

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;