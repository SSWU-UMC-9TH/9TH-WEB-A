import React, { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface FloatingButtonProps {
  children?: ReactNode;
  to: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ children, to }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(to);
  };

  return (
    <button
      onClick={handleNavigation}
      className="
        fixed 
        bottom-8 
        right-8 
        p-4 
        rounded-full 
        bg-[#FF69B4]
        text-white 
        shadow-2xl 
        hover:bg-[#495057] 
        transition 
        duration-300
        z-50 
        flex 
        items-center 
        justify-center
        w-14 h-14 
      "
    >
      {children}
    </button>
  );
};

export default FloatingButton;
