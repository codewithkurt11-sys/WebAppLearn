import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    // Prevent multiple React instances (can happen with pnpm/npm link)
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    // Split vendor libraries and the large shared module into separate chunks.
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor: Supabase client
          if (id.includes("@supabase")) return "supabase";
          // Vendor: Lucide icons
          if (id.includes("lucide-react")) return "lucide";
          // Vendor: Sonner toasts
          if (id.includes("sonner")) return "sonner";
          // Shared app logic (shared.tsx is large — give it its own chunk)
          if (id.includes("src/shared")) return "shared";
        },
      },
    },
    // Report files > 500 KB as a warning.
    chunkSizeWarningLimit: 500,
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
});
