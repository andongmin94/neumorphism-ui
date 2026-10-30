import tailwindcss from "@tailwindcss/vite";
import press from "fumapress/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [press(), tailwindcss()],
  build: { license: { fileName: "third-party-licenses.md" } },
  resolve: {
    tsconfigPaths: true,
    dedupe: ["react", "react-dom", "@base-ui/react"],
  },
});
