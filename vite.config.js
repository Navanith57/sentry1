import { defineConfig, loadEnv } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      sentryVitePlugin({
        org: env.VITE_SENTRY_ORG,
        project: env.VITE_SENTRY_PROJECT,
        release: { name: env.VITE_RELEASE },
        authToken: env.VITE_SENTRY_AUTH,
        sourcemaps: {
          assets: "./**", // Upload all source maps
          ignore: ["./node_modules/**", "vite.config.js"], // Ignore dependencies and config file
        }
      }),
    ],
  };
});
