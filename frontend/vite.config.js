import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // needed for docker
    watch: {
      usePolling: true, // needed for Docker on Windows/macOS
    },
  },
  resolve: {
    alias: {
      // "@requests": path.resolve(__dirname, "./src/services/requests"),
    },
  },
});
