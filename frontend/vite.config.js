import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
   plugins: [
      react(),
      svgr({
         svgrOptions: {
            icon: true,
         },
      }),
      tailwindcss(),
   ],
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
   server: {
      fs: {
         allow: [path.resolve(__dirname, "."), path.resolve(__dirname, "..")],
      },
   },
});
