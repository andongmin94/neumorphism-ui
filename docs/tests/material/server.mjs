import { createServer } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
const here = fileURLToPath(new URL("./", import.meta.url));
const source = fileURLToPath(new URL("../../src/registry/", import.meta.url));
const server = await createServer({
  configFile: false, root: here, plugins: [tailwindcss()],
  resolve: { dedupe: ["react", "react-dom"], alias: { "@/components/ui": source + "components/ui", "@/lib/utils": source + "lib/utils.ts", "@/material-theme": source + "theme.ts" } },
  oxc: { jsx: { runtime: "automatic" } },
  server: { host: "127.0.0.1", port: 4181, strictPort: true, fs: { allow: [fileURLToPath(new URL("../../../", import.meta.url))] } },
});
await server.listen();
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, async () => { await server.close(); process.exit(0); });
