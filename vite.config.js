// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   root: ".", // Ensure Vite recognizes the correct root directory
//   base: "/", // Ensure correct path handling
//   build: {
//     outDir: "dist", // Output directory for build files
//     emptyOutDir: true,
//   },
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // Ensure Vite recognizes the correct root directory
  base: "/", // Ensure correct path handling
  server: {
    host: "0.0.0.0", // External access for Railway
    port: process.env.PORT || 5173, // Use Railway's assigned port
    strictPort: true,
  },
  build: {
    outDir: "dist", // Output directory for build files
    emptyOutDir: true,
  },
});
