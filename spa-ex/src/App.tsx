import React, { useEffect, useState } from "react";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

type RoutesType = {
  [key: string]: React.ReactNode;
};

const routes: RoutesType = {
  "/": <Home />,
  "/about": <About />,
  "/contact": <Contact />
};

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  // 뒤/앞 버튼 처리
  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath) return;
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    margin: "0 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#A9746E",
    color: "#fff",
    fontWeight: "bold",
    transition: "background-color 0.2s"
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "40px" }}>
      <h1 style={{ color: "#A9746E" }}>모카의 SPA 예제</h1>

      <nav style={{ margin: "30px 0" }}>
        {["/", "/about", "/contact"].map((path) => {
          const label = path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={buttonStyle}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#A9746E")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#A9746E")}
            >
              {label}
            </button>
          );
        })}
      </nav>

      <div
        style={{
          borderTop: "2px solid #dfe6e9",
          paddingTop: "20px",
          minHeight: "200px"
        }}
      >
        {routes[currentPath] || <h2>⚠️ 페이지를 찾을 수 없습니다.</h2>}
      </div>
    </div>
  );
};

export default App;
