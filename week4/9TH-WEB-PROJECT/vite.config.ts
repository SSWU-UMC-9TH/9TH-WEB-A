import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const API_URL = env.VITE_SERVER_API_URL || 'http://localhost:8000'; 

  console.log(`📡 API Proxy Target: ${API_URL}`);

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
        },
      },
    },
  }
});