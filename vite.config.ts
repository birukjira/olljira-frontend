import path from "path";
const __dirname = import.meta.dirname;
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// Frontend-only build. The API base URL comes from VITE_API_URL
// (e.g. https://api.yourdomain.com). In dev, /api is proxied to the
// backend origin so cookies stay same-site.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");
  const apiOrigin = env.VITE_API_ORIGIN ?? "http://localhost:3000";
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        "/api": { target: apiOrigin, changeOrigin: true },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@contracts": path.resolve(__dirname, "./shared/contracts"),
        "@db": path.resolve(__dirname, "./shared/db"),
      },
    },
    envDir: path.resolve(__dirname),
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
    },
  };
});
