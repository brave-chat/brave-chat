import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import million from "million/compiler";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), million.vite()],
  define: {
    "process.env": process.env,
  },
});
