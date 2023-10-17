import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";



export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:4000",
          target: " https://vercel.com/",
        changeOrigin: true,
      },
    },
  },
});

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         // target: "http://localhost:4000",
//         // ecommerce-mern-puce.vercel.app
//         target: "ecommerce-mern-puce.vercel.app",
//         changeOrigin: true,
//       },
//     },
//   },
// });
