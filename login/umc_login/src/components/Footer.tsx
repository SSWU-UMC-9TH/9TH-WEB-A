import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#343A40] text-[#E9ECEF] py-6 mt-auto">
      <div className="container mx-auto text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} MOCA MOVIE. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link to="#" className="hover:underline">
            개인정보 처리방침
          </Link>
          <Link to="#" className="hover:underline">
            이용 약관
          </Link>
          <Link to="#" className="hover:underline">
            고객 지원
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
