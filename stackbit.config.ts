// stackbit.config.ts
export default {
  stackbitVersion: "~0.6.0",
  ssgName: "custom",
  nodeVersion: "18",
  // Astro to run inside Visual Editor container
  devCommand: "node_modules/.bin/astro dev --port {PORT} --hostname 127.0.0.1",
  // Astro-specific configuration
  experimental: {
    ssg: {
      name: "Astro",
      logPatterns: {
        up: ["is ready", "astro"]
      },
      directRoutes: {
        "socket.io": "socket.io"
      },
      passthrough: ["/vite-hmr/**"]
    }
  }
};
