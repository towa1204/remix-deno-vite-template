import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

function getEnvironmentVariable(key) {
  // @ts-ignore
  return typeof Deno !== 'undefined' && Deno.env.get(key)
    || typeof process !== 'undefined' && process.env[key] 
    || undefined;
}

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
  ...(getEnvironmentVariable("NODE_ENV") === "production" && {
    define: { "process.env.NODE_ENV": JSON.stringify("production") },
    ssr: { noExternal: true },
  }),
});
