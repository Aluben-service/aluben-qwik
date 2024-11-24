// vite.config.ts
import { defineConfig } from "file:///C:/Users/kongf/OneDrive/Desktop/dev/aluben/node_modules/vite/dist/node/index.js";
import { qwikVite } from "file:///C:/Users/kongf/OneDrive/Desktop/dev/aluben/node_modules/@builder.io/qwik/dist/optimizer.mjs";
import { qwikCity } from "file:///C:/Users/kongf/OneDrive/Desktop/dev/aluben/node_modules/@builder.io/qwik-city/lib/vite/index.mjs";
import { qwikPwa } from "file:///C:/Users/kongf/OneDrive/Desktop/dev/aluben/node_modules/@qwikdev/pwa/lib/index.qwik.js";
import { ChemicalVitePlugin } from "file:///C:/Users/kongf/OneDrive/Desktop/dev/aluben/node_modules/chemicaljs/dist/index.js";
import tsconfigPaths from "file:///C:/Users/kongf/OneDrive/Desktop/dev/aluben/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var package_default = {
  name: "my-qwik-empty-starter",
  description: "Blank project with routing included",
  engines: {
    node: ">=20.0.0"
  },
  "engines-annotation": "Mostly required by sharp which needs a Node-API v9 compatible runtime",
  private: true,
  trustedDependencies: [
    "@netlify/content-engine",
    "@netlify/esbuild",
    "@rubynetwork/rh",
    "bufferutil",
    "contentful",
    "deasync",
    "es5-ext",
    "esbuild",
    "lmdb",
    "msgpackr-extract",
    "netlify-cli",
    "nx",
    "protobufjs",
    "sharp",
    "sqlite3",
    "utf-8-validate",
    "vercel"
  ],
  "trustedDependencies-annotation": "Needed for bun to allow running install scripts",
  type: "module",
  scripts: {
    build: "qwik build",
    "build.client": "vite build",
    "build.preview": "vite build --ssr src/entry.preview.tsx",
    "build.server": "vite build -c adapters/netlify-edge/vite.config.ts",
    "build.server.vercel": "vite build -c adapters/vercel-edge/vite.config.ts",
    "build.types": "tsc --incremental --noEmit",
    "deploy.vercel": "vercel deploy",
    deploy: "netlify deploy",
    dev: "vite --mode ssr",
    "dev.debug": "node --inspect-brk ./node_modules/vite/bin/vite.js --mode ssr --force",
    fmt: "prettier --write .",
    "fmt.check": "prettier --check .",
    generate: "pwa-assets-generator --preset minimal-2023 public/logo.svg",
    lintremove: 'eslint "src/**/*.ts*"',
    preview: "qwik build preview && vite preview --open",
    start: "vite --open --mode ssr",
    qwik: "qwik",
    "test:e2e": "playwright test"
  },
  devDependencies: {
    "@builder.io/qwik": "^1.10.0",
    "@builder.io/qwik-city": "^1.10.0",
    "@catppuccin/tailwindcss": "^0.1.6",
    "@netlify/edge-functions": "^2.11.0",
    "@playwright/test": "^1.48.2",
    "@qwik-ui/headless": "^0.6.2",
    "@qwikdev/pwa": "^0.0.4",
    "@qwikest/icons": "^0.0.13",
    "@types/eslint": "8.56.10",
    "@types/node": "20.14.11",
    "@types/three": "^0.170.0",
    "@typescript-eslint/eslint-plugin": "7.16.1",
    "@typescript-eslint/parser": "7.16.1",
    autoprefixer: "^10.4.20",
    chemicaljs: "^2.5.1",
    "netlify-cli": "^15.11.0",
    nx: "^20.1.2",
    postcss: "^8.4.49",
    prettier: "3.3.3",
    "prettier-plugin-tailwindcss": "^0.5.14",
    "qwik-ui": "^0.1.3",
    tailwindcss: "^3.4.15",
    "tailwindcss-animate": "^1.0.7",
    typescript: "5.4.5",
    vercel: "^29.4.0",
    vite: "5.3.6",
    "vite-tsconfig-paths": "^4.3.2"
  },
  dependencies: {
    "@mercuryworkshop/epoxy-transport": "^2.1.26",
    "@titaniumnetwork-dev/ultraviolet": "^3.2.10",
    "@vite-pwa/assets-generator": "^0.2.6",
    firebase: "^11.0.2",
    firebaseui: "^6.1.0",
    playwright: "^1.48.2",
    sweetalert2: "^11.14.5",
    "vite-plugin-static-copy": "^2.1.0",
    "wisp-server-node": "^1.1.7"
  },
  resolutions: {
    sharp: "0.32.6"
  },
  nx: {}
};

// vite.config.ts
var { dependencies = {}, devDependencies = {} } = package_default;
errorOnDuplicatesPkgDeps(devDependencies, dependencies);
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    define: {
      // (optional) enables debugging in workbox
      "process.env.NODE_ENV": JSON.stringify("development")
    },
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      qwikPwa({
        /* options */
      }),
      ChemicalVitePlugin({
        default: "uv",
        uv: true,
        rammerhead: false,
        experimental: {
          meteor: true,
          scramjet: true
        }
      })
    ],
    // This tells Vite which dependencies to pre-build in dev mode.
    optimizeDeps: {
      // Put problematic deps that break bundling here, mostly those with binaries.
      exclude: []
    },
    /**
     * This is an advanced setting. It improves the bundling of your server code. To use it, make sure you understand when your consumed packages are dependencies or dev dependencies. (otherwise things will break in production)
     */
    // ssr:
    //   command === "build" && mode === "production"
    //     ? {
    //         // All dev dependencies should be bundled in the server build
    //         noExternal: Object.keys(devDependencies),
    //         // Anything marked as a dependency will not be bundled
    //         // These should only be production binary deps (including deps of deps), CLI deps, and their module graph
    //         // If a dep-of-dep needs to be external, add it here
    //         // For example, if something uses `bcrypt` but you don't have it as a dep, you can write
    //         // external: [...Object.keys(dependencies), 'bcrypt']
    //         external: Object.keys(dependencies),
    //       }
    //     : undefined,
    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0"
      }
    },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "public, max-age=600"
      }
    }
  };
});
function errorOnDuplicatesPkgDeps(devDependencies2, dependencies2) {
  let msg = "";
  const duplicateDeps = Object.keys(devDependencies2).filter(
    (dep) => dependencies2[dep]
  );
  const qwikPkg = Object.keys(dependencies2).filter(
    (value) => /qwik/i.test(value)
  );
  msg = `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`;
  if (qwikPkg.length > 0) {
    throw new Error(msg);
  }
  msg = `
    Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies".
    Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
  `;
  if (duplicateDeps.length > 0) {
    throw new Error(msg);
  }
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxca29uZ2ZcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxkZXZcXFxcYWx1YmVuXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxrb25nZlxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXGRldlxcXFxhbHViZW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2tvbmdmL09uZURyaXZlL0Rlc2t0b3AvZGV2L2FsdWJlbi92aXRlLmNvbmZpZy50c1wiO1xyXG4vKipcclxuICogVGhpcyBpcyB0aGUgYmFzZSBjb25maWcgZm9yIHZpdGUuXHJcbiAqIFdoZW4gYnVpbGRpbmcsIHRoZSBhZGFwdGVyIGNvbmZpZyBpcyB1c2VkIHdoaWNoIGxvYWRzIHRoaXMgZmlsZSBhbmQgZXh0ZW5kcyBpdC5cclxuICovXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgcXdpa1ZpdGUgfSBmcm9tIFwiQGJ1aWxkZXIuaW8vcXdpay9vcHRpbWl6ZXJcIjtcclxuaW1wb3J0IHsgcXdpa0NpdHkgfSBmcm9tIFwiQGJ1aWxkZXIuaW8vcXdpay1jaXR5L3ZpdGVcIjtcclxuaW1wb3J0IHsgcXdpa1B3YSB9IGZyb20gXCJAcXdpa2Rldi9wd2FcIjtcclxuaW1wb3J0IHsgQ2hlbWljYWxWaXRlUGx1Z2luIH0gZnJvbSBcImNoZW1pY2FsanNcIjtcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuaW1wb3J0IHBrZyBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcclxuXHJcbnR5cGUgUGtnRGVwID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuY29uc3QgeyBkZXBlbmRlbmNpZXMgPSB7fSwgZGV2RGVwZW5kZW5jaWVzID0ge30gfSA9IHBrZyBhcyBhbnkgYXMge1xyXG4gIGRlcGVuZGVuY2llczogUGtnRGVwO1xyXG4gIGRldkRlcGVuZGVuY2llczogUGtnRGVwO1xyXG4gIFtrZXk6IHN0cmluZ106IHVua25vd247XHJcbn07XHJcbmVycm9yT25EdXBsaWNhdGVzUGtnRGVwcyhkZXZEZXBlbmRlbmNpZXMsIGRlcGVuZGVuY2llcyk7XHJcblxyXG4vKipcclxuICogTm90ZSB0aGF0IFZpdGUgbm9ybWFsbHkgc3RhcnRzIGZyb20gYGluZGV4Lmh0bWxgIGJ1dCB0aGUgcXdpa0NpdHkgcGx1Z2luIG1ha2VzIHN0YXJ0IGF0IGBzcmMvZW50cnkuc3NyLnRzeGAgaW5zdGVhZC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pOiBVc2VyQ29uZmlnID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgIC8vIChvcHRpb25hbCkgZW5hYmxlcyBkZWJ1Z2dpbmcgaW4gd29ya2JveFxyXG4gICAgICBcInByb2Nlc3MuZW52Lk5PREVfRU5WXCI6IEpTT04uc3RyaW5naWZ5KFwiZGV2ZWxvcG1lbnRcIiksXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICBxd2lrQ2l0eSgpLCBxd2lrVml0ZSgpLCB0c2NvbmZpZ1BhdGhzKCksIHF3aWtQd2Eoe1xyXG4gICAgICAgIC8qIG9wdGlvbnMgKi9cclxuICAgICAgfSksIENoZW1pY2FsVml0ZVBsdWdpbih7XHJcbiAgICAgICAgZGVmYXVsdDogJ3V2JyxcclxuICAgICAgICB1djogdHJ1ZSxcclxuICAgICAgICByYW1tZXJoZWFkOiBmYWxzZSxcclxuICAgICAgICBleHBlcmltZW50YWw6IHtcclxuICAgICAgICAgIG1ldGVvcjogdHJ1ZSxcclxuICAgICAgICAgIHNjcmFtamV0OiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgXSxcclxuICAgIC8vIFRoaXMgdGVsbHMgVml0ZSB3aGljaCBkZXBlbmRlbmNpZXMgdG8gcHJlLWJ1aWxkIGluIGRldiBtb2RlLlxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIC8vIFB1dCBwcm9ibGVtYXRpYyBkZXBzIHRoYXQgYnJlYWsgYnVuZGxpbmcgaGVyZSwgbW9zdGx5IHRob3NlIHdpdGggYmluYXJpZXMuXHJcbiAgICAgIGV4Y2x1ZGU6IFtdLFxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgaXMgYW4gYWR2YW5jZWQgc2V0dGluZy4gSXQgaW1wcm92ZXMgdGhlIGJ1bmRsaW5nIG9mIHlvdXIgc2VydmVyIGNvZGUuIFRvIHVzZSBpdCwgbWFrZSBzdXJlIHlvdSB1bmRlcnN0YW5kIHdoZW4geW91ciBjb25zdW1lZCBwYWNrYWdlcyBhcmUgZGVwZW5kZW5jaWVzIG9yIGRldiBkZXBlbmRlbmNpZXMuIChvdGhlcndpc2UgdGhpbmdzIHdpbGwgYnJlYWsgaW4gcHJvZHVjdGlvbilcclxuICAgICAqL1xyXG4gICAgLy8gc3NyOlxyXG4gICAgLy8gICBjb21tYW5kID09PSBcImJ1aWxkXCIgJiYgbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCJcclxuICAgIC8vICAgICA/IHtcclxuICAgIC8vICAgICAgICAgLy8gQWxsIGRldiBkZXBlbmRlbmNpZXMgc2hvdWxkIGJlIGJ1bmRsZWQgaW4gdGhlIHNlcnZlciBidWlsZFxyXG4gICAgLy8gICAgICAgICBub0V4dGVybmFsOiBPYmplY3Qua2V5cyhkZXZEZXBlbmRlbmNpZXMpLFxyXG4gICAgLy8gICAgICAgICAvLyBBbnl0aGluZyBtYXJrZWQgYXMgYSBkZXBlbmRlbmN5IHdpbGwgbm90IGJlIGJ1bmRsZWRcclxuICAgIC8vICAgICAgICAgLy8gVGhlc2Ugc2hvdWxkIG9ubHkgYmUgcHJvZHVjdGlvbiBiaW5hcnkgZGVwcyAoaW5jbHVkaW5nIGRlcHMgb2YgZGVwcyksIENMSSBkZXBzLCBhbmQgdGhlaXIgbW9kdWxlIGdyYXBoXHJcbiAgICAvLyAgICAgICAgIC8vIElmIGEgZGVwLW9mLWRlcCBuZWVkcyB0byBiZSBleHRlcm5hbCwgYWRkIGl0IGhlcmVcclxuICAgIC8vICAgICAgICAgLy8gRm9yIGV4YW1wbGUsIGlmIHNvbWV0aGluZyB1c2VzIGBiY3J5cHRgIGJ1dCB5b3UgZG9uJ3QgaGF2ZSBpdCBhcyBhIGRlcCwgeW91IGNhbiB3cml0ZVxyXG4gICAgLy8gICAgICAgICAvLyBleHRlcm5hbDogWy4uLk9iamVjdC5rZXlzKGRlcGVuZGVuY2llcyksICdiY3J5cHQnXVxyXG4gICAgLy8gICAgICAgICBleHRlcm5hbDogT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKSxcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vICAgICA6IHVuZGVmaW5lZCxcclxuXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIC8vIERvbid0IGNhY2hlIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaW4gZGV2IG1vZGVcclxuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJwdWJsaWMsIG1heC1hZ2U9MFwiLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHByZXZpZXc6IHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIC8vIERvIGNhY2hlIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaW4gcHJldmlldyAobm9uLWFkYXB0ZXIgcHJvZHVjdGlvbiBidWlsZClcclxuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJwdWJsaWMsIG1heC1hZ2U9NjAwXCIsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH07XHJcbn0pO1xyXG5cclxuLy8gKioqIHV0aWxzICoqKlxyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIHRvIGlkZW50aWZ5IGR1cGxpY2F0ZSBkZXBlbmRlbmNpZXMgYW5kIHRocm93IGFuIGVycm9yXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXZEZXBlbmRlbmNpZXMgLSBMaXN0IG9mIGRldmVsb3BtZW50IGRlcGVuZGVuY2llc1xyXG4gKiBAcGFyYW0ge09iamVjdH0gZGVwZW5kZW5jaWVzIC0gTGlzdCBvZiBwcm9kdWN0aW9uIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuZnVuY3Rpb24gZXJyb3JPbkR1cGxpY2F0ZXNQa2dEZXBzKFxyXG4gIGRldkRlcGVuZGVuY2llczogUGtnRGVwLFxyXG4gIGRlcGVuZGVuY2llczogUGtnRGVwLFxyXG4pIHtcclxuICBsZXQgbXNnID0gXCJcIjtcclxuICAvLyBDcmVhdGUgYW4gYXJyYXkgJ2R1cGxpY2F0ZURlcHMnIGJ5IGZpbHRlcmluZyBkZXZEZXBlbmRlbmNpZXMuXHJcbiAgLy8gSWYgYSBkZXBlbmRlbmN5IGFsc28gZXhpc3RzIGluIGRlcGVuZGVuY2llcywgaXQgaXMgY29uc2lkZXJlZCBhIGR1cGxpY2F0ZS5cclxuICBjb25zdCBkdXBsaWNhdGVEZXBzID0gT2JqZWN0LmtleXMoZGV2RGVwZW5kZW5jaWVzKS5maWx0ZXIoXHJcbiAgICAoZGVwKSA9PiBkZXBlbmRlbmNpZXNbZGVwXSxcclxuICApO1xyXG5cclxuICAvLyBpbmNsdWRlIGFueSBrbm93biBxd2lrIHBhY2thZ2VzXHJcbiAgY29uc3QgcXdpa1BrZyA9IE9iamVjdC5rZXlzKGRlcGVuZGVuY2llcykuZmlsdGVyKCh2YWx1ZSkgPT5cclxuICAgIC9xd2lrL2kudGVzdCh2YWx1ZSksXHJcbiAgKTtcclxuXHJcbiAgLy8gYW55IGVycm9ycyBmb3IgbWlzc2luZyBcInF3aWstY2l0eS1wbGFuXCJcclxuICAvLyBbUExVR0lOX0VSUk9SXTogSW52YWxpZCBtb2R1bGUgXCJAcXdpay1jaXR5LXBsYW5cIiBpcyBub3QgYSB2YWxpZCBwYWNrYWdlXHJcbiAgbXNnID0gYE1vdmUgcXdpayBwYWNrYWdlcyAke3F3aWtQa2cuam9pbihcIiwgXCIpfSB0byBkZXZEZXBlbmRlbmNpZXNgO1xyXG5cclxuICBpZiAocXdpa1BrZy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuICB9XHJcblxyXG4gIC8vIEZvcm1hdCB0aGUgZXJyb3IgbWVzc2FnZSB3aXRoIHRoZSBkdXBsaWNhdGVzIGxpc3QuXHJcbiAgLy8gVGhlIGBqb2luYCBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlcHJlc2VudCB0aGUgZWxlbWVudHMgb2YgdGhlICdkdXBsaWNhdGVEZXBzJyBhcnJheSBhcyBhIGNvbW1hLXNlcGFyYXRlZCBzdHJpbmcuXHJcbiAgbXNnID0gYFxyXG4gICAgV2FybmluZzogVGhlIGRlcGVuZGVuY3kgXCIke2R1cGxpY2F0ZURlcHMuam9pbihcIiwgXCIpfVwiIGlzIGxpc3RlZCBpbiBib3RoIFwiZGV2RGVwZW5kZW5jaWVzXCIgYW5kIFwiZGVwZW5kZW5jaWVzXCIuXHJcbiAgICBQbGVhc2UgbW92ZSB0aGUgZHVwbGljYXRlZCBkZXBlbmRlbmNpZXMgdG8gXCJkZXZEZXBlbmRlbmNpZXNcIiBvbmx5IGFuZCByZW1vdmUgaXQgZnJvbSBcImRlcGVuZGVuY2llc1wiXHJcbiAgYDtcclxuXHJcbiAgLy8gVGhyb3cgYW4gZXJyb3Igd2l0aCB0aGUgY29uc3RydWN0ZWQgbWVzc2FnZS5cclxuICBpZiAoZHVwbGljYXRlRGVwcy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuICB9XHJcbn1cclxuIiwgIntcbiAgXCJuYW1lXCI6IFwibXktcXdpay1lbXB0eS1zdGFydGVyXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJCbGFuayBwcm9qZWN0IHdpdGggcm91dGluZyBpbmNsdWRlZFwiLFxuICBcImVuZ2luZXNcIjoge1xuICAgIFwibm9kZVwiOiBcIj49MjAuMC4wXCJcbiAgfSxcbiAgXCJlbmdpbmVzLWFubm90YXRpb25cIjogXCJNb3N0bHkgcmVxdWlyZWQgYnkgc2hhcnAgd2hpY2ggbmVlZHMgYSBOb2RlLUFQSSB2OSBjb21wYXRpYmxlIHJ1bnRpbWVcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwidHJ1c3RlZERlcGVuZGVuY2llc1wiOiBbXG4gICAgXCJAbmV0bGlmeS9jb250ZW50LWVuZ2luZVwiLFxuICAgIFwiQG5ldGxpZnkvZXNidWlsZFwiLFxuICAgIFwiQHJ1YnluZXR3b3JrL3JoXCIsXG4gICAgXCJidWZmZXJ1dGlsXCIsXG4gICAgXCJjb250ZW50ZnVsXCIsXG4gICAgXCJkZWFzeW5jXCIsXG4gICAgXCJlczUtZXh0XCIsXG4gICAgXCJlc2J1aWxkXCIsXG4gICAgXCJsbWRiXCIsXG4gICAgXCJtc2dwYWNrci1leHRyYWN0XCIsXG4gICAgXCJuZXRsaWZ5LWNsaVwiLFxuICAgIFwibnhcIixcbiAgICBcInByb3RvYnVmanNcIixcbiAgICBcInNoYXJwXCIsXG4gICAgXCJzcWxpdGUzXCIsXG4gICAgXCJ1dGYtOC12YWxpZGF0ZVwiLFxuICAgIFwidmVyY2VsXCJcbiAgXSxcbiAgXCJ0cnVzdGVkRGVwZW5kZW5jaWVzLWFubm90YXRpb25cIjogXCJOZWVkZWQgZm9yIGJ1biB0byBhbGxvdyBydW5uaW5nIGluc3RhbGwgc2NyaXB0c1wiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1aWxkXCI6IFwicXdpayBidWlsZFwiLFxuICAgIFwiYnVpbGQuY2xpZW50XCI6IFwidml0ZSBidWlsZFwiLFxuICAgIFwiYnVpbGQucHJldmlld1wiOiBcInZpdGUgYnVpbGQgLS1zc3Igc3JjL2VudHJ5LnByZXZpZXcudHN4XCIsXG4gICAgXCJidWlsZC5zZXJ2ZXJcIjogXCJ2aXRlIGJ1aWxkIC1jIGFkYXB0ZXJzL25ldGxpZnktZWRnZS92aXRlLmNvbmZpZy50c1wiLFxuICAgIFwiYnVpbGQuc2VydmVyLnZlcmNlbFwiOiBcInZpdGUgYnVpbGQgLWMgYWRhcHRlcnMvdmVyY2VsLWVkZ2Uvdml0ZS5jb25maWcudHNcIixcbiAgICBcImJ1aWxkLnR5cGVzXCI6IFwidHNjIC0taW5jcmVtZW50YWwgLS1ub0VtaXRcIixcbiAgICBcImRlcGxveS52ZXJjZWxcIjogXCJ2ZXJjZWwgZGVwbG95XCIsXG4gICAgXCJkZXBsb3lcIjogXCJuZXRsaWZ5IGRlcGxveVwiLFxuICAgIFwiZGV2XCI6IFwidml0ZSAtLW1vZGUgc3NyXCIsXG4gICAgXCJkZXYuZGVidWdcIjogXCJub2RlIC0taW5zcGVjdC1icmsgLi9ub2RlX21vZHVsZXMvdml0ZS9iaW4vdml0ZS5qcyAtLW1vZGUgc3NyIC0tZm9yY2VcIixcbiAgICBcImZtdFwiOiBcInByZXR0aWVyIC0td3JpdGUgLlwiLFxuICAgIFwiZm10LmNoZWNrXCI6IFwicHJldHRpZXIgLS1jaGVjayAuXCIsXG4gICAgXCJnZW5lcmF0ZVwiOiBcInB3YS1hc3NldHMtZ2VuZXJhdG9yIC0tcHJlc2V0IG1pbmltYWwtMjAyMyBwdWJsaWMvbG9nby5zdmdcIixcbiAgICBcImxpbnRyZW1vdmVcIjogXCJlc2xpbnQgXFxcInNyYy8qKi8qLnRzKlxcXCJcIixcbiAgICBcInByZXZpZXdcIjogXCJxd2lrIGJ1aWxkIHByZXZpZXcgJiYgdml0ZSBwcmV2aWV3IC0tb3BlblwiLFxuICAgIFwic3RhcnRcIjogXCJ2aXRlIC0tb3BlbiAtLW1vZGUgc3NyXCIsXG4gICAgXCJxd2lrXCI6IFwicXdpa1wiLFxuICAgIFwidGVzdDplMmVcIjogXCJwbGF5d3JpZ2h0IHRlc3RcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYnVpbGRlci5pby9xd2lrXCI6IFwiXjEuMTAuMFwiLFxuICAgIFwiQGJ1aWxkZXIuaW8vcXdpay1jaXR5XCI6IFwiXjEuMTAuMFwiLFxuICAgIFwiQGNhdHBwdWNjaW4vdGFpbHdpbmRjc3NcIjogXCJeMC4xLjZcIixcbiAgICBcIkBuZXRsaWZ5L2VkZ2UtZnVuY3Rpb25zXCI6IFwiXjIuMTEuMFwiLFxuICAgIFwiQHBsYXl3cmlnaHQvdGVzdFwiOiBcIl4xLjQ4LjJcIixcbiAgICBcIkBxd2lrLXVpL2hlYWRsZXNzXCI6IFwiXjAuNi4yXCIsXG4gICAgXCJAcXdpa2Rldi9wd2FcIjogXCJeMC4wLjRcIixcbiAgICBcIkBxd2lrZXN0L2ljb25zXCI6IFwiXjAuMC4xM1wiLFxuICAgIFwiQHR5cGVzL2VzbGludFwiOiBcIjguNTYuMTBcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiMjAuMTQuMTFcIixcbiAgICBcIkB0eXBlcy90aHJlZVwiOiBcIl4wLjE3MC4wXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIjcuMTYuMVwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIjcuMTYuMVwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMjBcIixcbiAgICBcImNoZW1pY2FsanNcIjogXCJeMi41LjFcIixcbiAgICBcIm5ldGxpZnktY2xpXCI6IFwiXjE1LjExLjBcIixcbiAgICBcIm54XCI6IFwiXjIwLjEuMlwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuNDlcIixcbiAgICBcInByZXR0aWVyXCI6IFwiMy4zLjNcIixcbiAgICBcInByZXR0aWVyLXBsdWdpbi10YWlsd2luZGNzc1wiOiBcIl4wLjUuMTRcIixcbiAgICBcInF3aWstdWlcIjogXCJeMC4xLjNcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuNC4xNVwiLFxuICAgIFwidGFpbHdpbmRjc3MtYW5pbWF0ZVwiOiBcIl4xLjAuN1wiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIjUuNC41XCIsXG4gICAgXCJ2ZXJjZWxcIjogXCJeMjkuNC4wXCIsXG4gICAgXCJ2aXRlXCI6IFwiNS4zLjZcIixcbiAgICBcInZpdGUtdHNjb25maWctcGF0aHNcIjogXCJeNC4zLjJcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAbWVyY3VyeXdvcmtzaG9wL2Vwb3h5LXRyYW5zcG9ydFwiOiBcIl4yLjEuMjZcIixcbiAgICBcIkB0aXRhbml1bW5ldHdvcmstZGV2L3VsdHJhdmlvbGV0XCI6IFwiXjMuMi4xMFwiLFxuICAgIFwiQHZpdGUtcHdhL2Fzc2V0cy1nZW5lcmF0b3JcIjogXCJeMC4yLjZcIixcbiAgICBcImZpcmViYXNlXCI6IFwiXjExLjAuMlwiLFxuICAgIFwiZmlyZWJhc2V1aVwiOiBcIl42LjEuMFwiLFxuICAgIFwicGxheXdyaWdodFwiOiBcIl4xLjQ4LjJcIixcbiAgICBcInN3ZWV0YWxlcnQyXCI6IFwiXjExLjE0LjVcIixcbiAgICBcInZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5XCI6IFwiXjIuMS4wXCIsXG4gICAgXCJ3aXNwLXNlcnZlci1ub2RlXCI6IFwiXjEuMS43XCJcbiAgfSxcbiAgXCJyZXNvbHV0aW9uc1wiOiB7XG4gICAgXCJzaGFycFwiOiBcIjAuMzIuNlwiXG4gIH0sXG4gIFwibnhcIjoge31cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFLQSxTQUFTLG9CQUFxQztBQUM5QyxTQUFTLGdCQUFnQjtBQUN6QixTQUFTLGdCQUFnQjtBQUN6QixTQUFTLGVBQWU7QUFDeEIsU0FBUywwQkFBMEI7QUFDbkMsT0FBTyxtQkFBbUI7OztBQ1YxQjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsYUFBZTtBQUFBLEVBQ2YsU0FBVztBQUFBLElBQ1QsTUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLHNCQUFzQjtBQUFBLEVBQ3RCLFNBQVc7QUFBQSxFQUNYLHFCQUF1QjtBQUFBLElBQ3JCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGtDQUFrQztBQUFBLEVBQ2xDLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxJQUNULE9BQVM7QUFBQSxJQUNULGdCQUFnQjtBQUFBLElBQ2hCLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLHVCQUF1QjtBQUFBLElBQ3ZCLGVBQWU7QUFBQSxJQUNmLGlCQUFpQjtBQUFBLElBQ2pCLFFBQVU7QUFBQSxJQUNWLEtBQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLEtBQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLFVBQVk7QUFBQSxJQUNaLFlBQWM7QUFBQSxJQUNkLFNBQVc7QUFBQSxJQUNYLE9BQVM7QUFBQSxJQUNULE1BQVE7QUFBQSxJQUNSLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNqQixvQkFBb0I7QUFBQSxJQUNwQix5QkFBeUI7QUFBQSxJQUN6QiwyQkFBMkI7QUFBQSxJQUMzQiwyQkFBMkI7QUFBQSxJQUMzQixvQkFBb0I7QUFBQSxJQUNwQixxQkFBcUI7QUFBQSxJQUNyQixnQkFBZ0I7QUFBQSxJQUNoQixrQkFBa0I7QUFBQSxJQUNsQixpQkFBaUI7QUFBQSxJQUNqQixlQUFlO0FBQUEsSUFDZixnQkFBZ0I7QUFBQSxJQUNoQixvQ0FBb0M7QUFBQSxJQUNwQyw2QkFBNkI7QUFBQSxJQUM3QixjQUFnQjtBQUFBLElBQ2hCLFlBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLElBQU07QUFBQSxJQUNOLFNBQVc7QUFBQSxJQUNYLFVBQVk7QUFBQSxJQUNaLCtCQUErQjtBQUFBLElBQy9CLFdBQVc7QUFBQSxJQUNYLGFBQWU7QUFBQSxJQUNmLHVCQUF1QjtBQUFBLElBQ3ZCLFlBQWM7QUFBQSxJQUNkLFFBQVU7QUFBQSxJQUNWLE1BQVE7QUFBQSxJQUNSLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxjQUFnQjtBQUFBLElBQ2Qsb0NBQW9DO0FBQUEsSUFDcEMsb0NBQW9DO0FBQUEsSUFDcEMsOEJBQThCO0FBQUEsSUFDOUIsVUFBWTtBQUFBLElBQ1osWUFBYztBQUFBLElBQ2QsWUFBYztBQUFBLElBQ2QsYUFBZTtBQUFBLElBQ2YsMkJBQTJCO0FBQUEsSUFDM0Isb0JBQW9CO0FBQUEsRUFDdEI7QUFBQSxFQUNBLGFBQWU7QUFBQSxJQUNiLE9BQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxJQUFNLENBQUM7QUFDVDs7O0FEL0VBLElBQU0sRUFBRSxlQUFlLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxFQUFFLElBQUk7QUFLcEQseUJBQXlCLGlCQUFpQixZQUFZO0FBS3RELElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQWtCO0FBQzdELFNBQU87QUFBQSxJQUNMLFFBQVE7QUFBQTtBQUFBLE1BRU4sd0JBQXdCLEtBQUssVUFBVSxhQUFhO0FBQUEsSUFDdEQ7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUFHLFNBQVM7QUFBQSxNQUFHLGNBQWM7QUFBQSxNQUFHLFFBQVE7QUFBQTtBQUFBLE1BRWpELENBQUM7QUFBQSxNQUFHLG1CQUFtQjtBQUFBLFFBQ3JCLFNBQVM7QUFBQSxRQUNULElBQUk7QUFBQSxRQUNKLFlBQVk7QUFBQSxRQUNaLGNBQWM7QUFBQSxVQUNaLFFBQVE7QUFBQSxVQUNSLFVBQVU7QUFBQSxRQUNaO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBO0FBQUEsSUFFQSxjQUFjO0FBQUE7QUFBQSxNQUVaLFNBQVMsQ0FBQztBQUFBLElBQ1o7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBbUJBLFFBQVE7QUFBQSxNQUNOLFNBQVM7QUFBQTtBQUFBLFFBRVAsaUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUE7QUFBQSxRQUVQLGlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FBU0QsU0FBUyx5QkFDUEEsa0JBQ0FDLGVBQ0E7QUFDQSxNQUFJLE1BQU07QUFHVixRQUFNLGdCQUFnQixPQUFPLEtBQUtELGdCQUFlLEVBQUU7QUFBQSxJQUNqRCxDQUFDLFFBQVFDLGNBQWEsR0FBRztBQUFBLEVBQzNCO0FBR0EsUUFBTSxVQUFVLE9BQU8sS0FBS0EsYUFBWSxFQUFFO0FBQUEsSUFBTyxDQUFDLFVBQ2hELFFBQVEsS0FBSyxLQUFLO0FBQUEsRUFDcEI7QUFJQSxRQUFNLHNCQUFzQixRQUFRLEtBQUssSUFBSSxDQUFDO0FBRTlDLE1BQUksUUFBUSxTQUFTLEdBQUc7QUFDdEIsVUFBTSxJQUFJLE1BQU0sR0FBRztBQUFBLEVBQ3JCO0FBSUEsUUFBTTtBQUFBLCtCQUN1QixjQUFjLEtBQUssSUFBSSxDQUFDO0FBQUE7QUFBQTtBQUtyRCxNQUFJLGNBQWMsU0FBUyxHQUFHO0FBQzVCLFVBQU0sSUFBSSxNQUFNLEdBQUc7QUFBQSxFQUNyQjtBQUNGOyIsCiAgIm5hbWVzIjogWyJkZXZEZXBlbmRlbmNpZXMiLCAiZGVwZW5kZW5jaWVzIl0KfQo=
