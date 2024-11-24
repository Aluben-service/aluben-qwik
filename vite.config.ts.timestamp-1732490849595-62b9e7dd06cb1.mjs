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
    "@playwright/test": "^1.49.0",
    "@builder.io/qwik": "^1.10.0",
    "@builder.io/qwik-city": "^1.10.0",
    "@catppuccin/tailwindcss": "^0.1.6",
    "@netlify/edge-functions": "^2.11.0",
    "@qwikdev/pwa": "^0.0.4",
    "@qwikest/icons": "^0.0.13",
    "@types/eslint": "8.56.10",
    "@types/node": "20.14.11",
    "@typescript-eslint/eslint-plugin": "7.16.1",
    "@typescript-eslint/parser": "7.16.1",
    autoprefixer: "^10.4.20",
    chemicaljs: "^2.5.1",
    "netlify-cli": "^15.11.0",
    nx: "^20.1.2",
    postcss: "^8.4.49",
    prettier: "3.3.3",
    "prettier-plugin-tailwindcss": "^0.5.14",
    tailwindcss: "^3.4.15",
    "tailwindcss-animate": "^1.0.7",
    typescript: "^5.7.2",
    vite: "5.3.6",
    "vite-tsconfig-paths": "^4.3.2"
  },
  dependencies: {
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.4",
    "class-variance-authority": "^0.7.0",
    localforage: "^1.10.0",
    firebase: "^11.0.2",
    firebaseui: "^6.1.0",
    "lucide-react": "^0.460.0",
    "tailwind-merge": "^2.5.4",
    typecript: "^0.0.1-security",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxca29uZ2ZcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxkZXZcXFxcYWx1YmVuXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxrb25nZlxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXGRldlxcXFxhbHViZW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2tvbmdmL09uZURyaXZlL0Rlc2t0b3AvZGV2L2FsdWJlbi92aXRlLmNvbmZpZy50c1wiO1xyXG4vKipcclxuICogVGhpcyBpcyB0aGUgYmFzZSBjb25maWcgZm9yIHZpdGUuXHJcbiAqIFdoZW4gYnVpbGRpbmcsIHRoZSBhZGFwdGVyIGNvbmZpZyBpcyB1c2VkIHdoaWNoIGxvYWRzIHRoaXMgZmlsZSBhbmQgZXh0ZW5kcyBpdC5cclxuICovXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgcXdpa1ZpdGUgfSBmcm9tIFwiQGJ1aWxkZXIuaW8vcXdpay9vcHRpbWl6ZXJcIjtcclxuaW1wb3J0IHsgcXdpa0NpdHkgfSBmcm9tIFwiQGJ1aWxkZXIuaW8vcXdpay1jaXR5L3ZpdGVcIjtcclxuaW1wb3J0IHsgcXdpa1B3YSB9IGZyb20gXCJAcXdpa2Rldi9wd2FcIjtcclxuaW1wb3J0IHsgQ2hlbWljYWxWaXRlUGx1Z2luIH0gZnJvbSBcImNoZW1pY2FsanNcIjtcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuaW1wb3J0IHBrZyBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcclxuXHJcbnR5cGUgUGtnRGVwID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuY29uc3QgeyBkZXBlbmRlbmNpZXMgPSB7fSwgZGV2RGVwZW5kZW5jaWVzID0ge30gfSA9IHBrZyBhcyBhbnkgYXMge1xyXG4gIGRlcGVuZGVuY2llczogUGtnRGVwO1xyXG4gIGRldkRlcGVuZGVuY2llczogUGtnRGVwO1xyXG4gIFtrZXk6IHN0cmluZ106IHVua25vd247XHJcbn07XHJcbmVycm9yT25EdXBsaWNhdGVzUGtnRGVwcyhkZXZEZXBlbmRlbmNpZXMsIGRlcGVuZGVuY2llcyk7XHJcblxyXG4vKipcclxuICogTm90ZSB0aGF0IFZpdGUgbm9ybWFsbHkgc3RhcnRzIGZyb20gYGluZGV4Lmh0bWxgIGJ1dCB0aGUgcXdpa0NpdHkgcGx1Z2luIG1ha2VzIHN0YXJ0IGF0IGBzcmMvZW50cnkuc3NyLnRzeGAgaW5zdGVhZC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pOiBVc2VyQ29uZmlnID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgIC8vIChvcHRpb25hbCkgZW5hYmxlcyBkZWJ1Z2dpbmcgaW4gd29ya2JveFxyXG4gICAgICBcInByb2Nlc3MuZW52Lk5PREVfRU5WXCI6IEpTT04uc3RyaW5naWZ5KFwiZGV2ZWxvcG1lbnRcIiksXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICBxd2lrQ2l0eSgpLCBxd2lrVml0ZSgpLCB0c2NvbmZpZ1BhdGhzKCksIHF3aWtQd2Eoe1xyXG4gICAgICAgIC8qIG9wdGlvbnMgKi9cclxuICAgICAgfSksIENoZW1pY2FsVml0ZVBsdWdpbih7XHJcbiAgICAgICAgZGVmYXVsdDogJ3V2JyxcclxuICAgICAgICB1djogdHJ1ZSxcclxuICAgICAgICByYW1tZXJoZWFkOiBmYWxzZSxcclxuICAgICAgICBleHBlcmltZW50YWw6IHtcclxuICAgICAgICAgIG1ldGVvcjogdHJ1ZSxcclxuICAgICAgICAgIHNjcmFtamV0OiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgXSxcclxuICAgIC8vIFRoaXMgdGVsbHMgVml0ZSB3aGljaCBkZXBlbmRlbmNpZXMgdG8gcHJlLWJ1aWxkIGluIGRldiBtb2RlLlxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIC8vIFB1dCBwcm9ibGVtYXRpYyBkZXBzIHRoYXQgYnJlYWsgYnVuZGxpbmcgaGVyZSwgbW9zdGx5IHRob3NlIHdpdGggYmluYXJpZXMuXHJcbiAgICAgIGV4Y2x1ZGU6IFtdLFxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBpcyBhbiBhZHZhbmNlZCBzZXR0aW5nLiBJdCBpbXByb3ZlcyB0aGUgYnVuZGxpbmcgb2YgeW91ciBzZXJ2ZXIgY29kZS4gVG8gdXNlIGl0LCBtYWtlIHN1cmUgeW91IHVuZGVyc3RhbmQgd2hlbiB5b3VyIGNvbnN1bWVkIHBhY2thZ2VzIGFyZSBkZXBlbmRlbmNpZXMgb3IgZGV2IGRlcGVuZGVuY2llcy4gKG90aGVyd2lzZSB0aGluZ3Mgd2lsbCBicmVhayBpbiBwcm9kdWN0aW9uKVxyXG4gICAgICovXHJcbiAgICAvLyBzc3I6XHJcbiAgICAvLyAgIGNvbW1hbmQgPT09IFwiYnVpbGRcIiAmJiBtb2RlID09PSBcInByb2R1Y3Rpb25cIlxyXG4gICAgLy8gICAgID8ge1xyXG4gICAgLy8gICAgICAgICAvLyBBbGwgZGV2IGRlcGVuZGVuY2llcyBzaG91bGQgYmUgYnVuZGxlZCBpbiB0aGUgc2VydmVyIGJ1aWxkXHJcbiAgICAvLyAgICAgICAgIG5vRXh0ZXJuYWw6IE9iamVjdC5rZXlzKGRldkRlcGVuZGVuY2llcyksXHJcbiAgICAvLyAgICAgICAgIC8vIEFueXRoaW5nIG1hcmtlZCBhcyBhIGRlcGVuZGVuY3kgd2lsbCBub3QgYmUgYnVuZGxlZFxyXG4gICAgLy8gICAgICAgICAvLyBUaGVzZSBzaG91bGQgb25seSBiZSBwcm9kdWN0aW9uIGJpbmFyeSBkZXBzIChpbmNsdWRpbmcgZGVwcyBvZiBkZXBzKSwgQ0xJIGRlcHMsIGFuZCB0aGVpciBtb2R1bGUgZ3JhcGhcclxuICAgIC8vICAgICAgICAgLy8gSWYgYSBkZXAtb2YtZGVwIG5lZWRzIHRvIGJlIGV4dGVybmFsLCBhZGQgaXQgaGVyZVxyXG4gICAgLy8gICAgICAgICAvLyBGb3IgZXhhbXBsZSwgaWYgc29tZXRoaW5nIHVzZXMgYGJjcnlwdGAgYnV0IHlvdSBkb24ndCBoYXZlIGl0IGFzIGEgZGVwLCB5b3UgY2FuIHdyaXRlXHJcbiAgICAvLyAgICAgICAgIC8vIGV4dGVybmFsOiBbLi4uT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKSwgJ2JjcnlwdCddXHJcbiAgICAvLyAgICAgICAgIGV4dGVybmFsOiBPYmplY3Qua2V5cyhkZXBlbmRlbmNpZXMpLFxyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIDogdW5kZWZpbmVkLFxyXG5cclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgLy8gRG9uJ3QgY2FjaGUgdGhlIHNlcnZlciByZXNwb25zZSBpbiBkZXYgbW9kZVxyXG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcInB1YmxpYywgbWF4LWFnZT0wXCIsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcHJldmlldzoge1xyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgLy8gRG8gY2FjaGUgdGhlIHNlcnZlciByZXNwb25zZSBpbiBwcmV2aWV3IChub24tYWRhcHRlciBwcm9kdWN0aW9uIGJ1aWxkKVxyXG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcInB1YmxpYywgbWF4LWFnZT02MDBcIixcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxufSk7XHJcblxyXG4vLyAqKiogdXRpbHMgKioqXHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gdG8gaWRlbnRpZnkgZHVwbGljYXRlIGRlcGVuZGVuY2llcyBhbmQgdGhyb3cgYW4gZXJyb3JcclxuICogQHBhcmFtIHtPYmplY3R9IGRldkRlcGVuZGVuY2llcyAtIExpc3Qgb2YgZGV2ZWxvcG1lbnQgZGVwZW5kZW5jaWVzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXBlbmRlbmNpZXMgLSBMaXN0IG9mIHByb2R1Y3Rpb24gZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5mdW5jdGlvbiBlcnJvck9uRHVwbGljYXRlc1BrZ0RlcHMoXHJcbiAgZGV2RGVwZW5kZW5jaWVzOiBQa2dEZXAsXHJcbiAgZGVwZW5kZW5jaWVzOiBQa2dEZXAsXHJcbikge1xyXG4gIGxldCBtc2cgPSBcIlwiO1xyXG4gIC8vIENyZWF0ZSBhbiBhcnJheSAnZHVwbGljYXRlRGVwcycgYnkgZmlsdGVyaW5nIGRldkRlcGVuZGVuY2llcy5cclxuICAvLyBJZiBhIGRlcGVuZGVuY3kgYWxzbyBleGlzdHMgaW4gZGVwZW5kZW5jaWVzLCBpdCBpcyBjb25zaWRlcmVkIGEgZHVwbGljYXRlLlxyXG4gIGNvbnN0IGR1cGxpY2F0ZURlcHMgPSBPYmplY3Qua2V5cyhkZXZEZXBlbmRlbmNpZXMpLmZpbHRlcihcclxuICAgIChkZXApID0+IGRlcGVuZGVuY2llc1tkZXBdLFxyXG4gICk7XHJcblxyXG4gIC8vIGluY2x1ZGUgYW55IGtub3duIHF3aWsgcGFja2FnZXNcclxuICBjb25zdCBxd2lrUGtnID0gT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKS5maWx0ZXIoKHZhbHVlKSA9PlxyXG4gICAgL3F3aWsvaS50ZXN0KHZhbHVlKSxcclxuICApO1xyXG5cclxuICAvLyBhbnkgZXJyb3JzIGZvciBtaXNzaW5nIFwicXdpay1jaXR5LXBsYW5cIlxyXG4gIC8vIFtQTFVHSU5fRVJST1JdOiBJbnZhbGlkIG1vZHVsZSBcIkBxd2lrLWNpdHktcGxhblwiIGlzIG5vdCBhIHZhbGlkIHBhY2thZ2VcclxuICBtc2cgPSBgTW92ZSBxd2lrIHBhY2thZ2VzICR7cXdpa1BrZy5qb2luKFwiLCBcIil9IHRvIGRldkRlcGVuZGVuY2llc2A7XHJcblxyXG4gIGlmIChxd2lrUGtnLmxlbmd0aCA+IDApIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xyXG4gIH1cclxuXHJcbiAgLy8gRm9ybWF0IHRoZSBlcnJvciBtZXNzYWdlIHdpdGggdGhlIGR1cGxpY2F0ZXMgbGlzdC5cclxuICAvLyBUaGUgYGpvaW5gIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcmVwcmVzZW50IHRoZSBlbGVtZW50cyBvZiB0aGUgJ2R1cGxpY2F0ZURlcHMnIGFycmF5IGFzIGEgY29tbWEtc2VwYXJhdGVkIHN0cmluZy5cclxuICBtc2cgPSBgXHJcbiAgICBXYXJuaW5nOiBUaGUgZGVwZW5kZW5jeSBcIiR7ZHVwbGljYXRlRGVwcy5qb2luKFwiLCBcIil9XCIgaXMgbGlzdGVkIGluIGJvdGggXCJkZXZEZXBlbmRlbmNpZXNcIiBhbmQgXCJkZXBlbmRlbmNpZXNcIi5cclxuICAgIFBsZWFzZSBtb3ZlIHRoZSBkdXBsaWNhdGVkIGRlcGVuZGVuY2llcyB0byBcImRldkRlcGVuZGVuY2llc1wiIG9ubHkgYW5kIHJlbW92ZSBpdCBmcm9tIFwiZGVwZW5kZW5jaWVzXCJcclxuICBgO1xyXG5cclxuICAvLyBUaHJvdyBhbiBlcnJvciB3aXRoIHRoZSBjb25zdHJ1Y3RlZCBtZXNzYWdlLlxyXG4gIGlmIChkdXBsaWNhdGVEZXBzLmxlbmd0aCA+IDApIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xyXG4gIH1cclxufVxyXG4iLCAie1xyXG4gIFwibmFtZVwiOiBcIm15LXF3aWstZW1wdHktc3RhcnRlclwiLFxyXG4gIFwiZGVzY3JpcHRpb25cIjogXCJCbGFuayBwcm9qZWN0IHdpdGggcm91dGluZyBpbmNsdWRlZFwiLFxyXG4gIFwiZW5naW5lc1wiOiB7XHJcbiAgICBcIm5vZGVcIjogXCI+PTIwLjAuMFwiXHJcbiAgfSxcclxuICBcImVuZ2luZXMtYW5ub3RhdGlvblwiOiBcIk1vc3RseSByZXF1aXJlZCBieSBzaGFycCB3aGljaCBuZWVkcyBhIE5vZGUtQVBJIHY5IGNvbXBhdGlibGUgcnVudGltZVwiLFxyXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxyXG4gIFwidHJ1c3RlZERlcGVuZGVuY2llc1wiOiBbXHJcbiAgICBcIkBuZXRsaWZ5L2NvbnRlbnQtZW5naW5lXCIsXHJcbiAgICBcIkBuZXRsaWZ5L2VzYnVpbGRcIixcclxuICAgIFwiQHJ1YnluZXR3b3JrL3JoXCIsXHJcbiAgICBcImJ1ZmZlcnV0aWxcIixcclxuICAgIFwiY29udGVudGZ1bFwiLFxyXG4gICAgXCJkZWFzeW5jXCIsXHJcbiAgICBcImVzNS1leHRcIixcclxuICAgIFwiZXNidWlsZFwiLFxyXG4gICAgXCJsbWRiXCIsXHJcbiAgICBcIm1zZ3BhY2tyLWV4dHJhY3RcIixcclxuICAgIFwibmV0bGlmeS1jbGlcIixcclxuICAgIFwibnhcIixcclxuICAgIFwicHJvdG9idWZqc1wiLFxyXG4gICAgXCJzaGFycFwiLFxyXG4gICAgXCJzcWxpdGUzXCIsXHJcbiAgICBcInV0Zi04LXZhbGlkYXRlXCIsXHJcbiAgICBcInZlcmNlbFwiXHJcbiAgXSxcclxuICBcInRydXN0ZWREZXBlbmRlbmNpZXMtYW5ub3RhdGlvblwiOiBcIk5lZWRlZCBmb3IgYnVuIHRvIGFsbG93IHJ1bm5pbmcgaW5zdGFsbCBzY3JpcHRzXCIsXHJcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXHJcbiAgXCJzY3JpcHRzXCI6IHtcclxuICAgIFwiYnVpbGRcIjogXCJxd2lrIGJ1aWxkXCIsXHJcbiAgICBcImJ1aWxkLmNsaWVudFwiOiBcInZpdGUgYnVpbGRcIixcclxuICAgIFwiYnVpbGQucHJldmlld1wiOiBcInZpdGUgYnVpbGQgLS1zc3Igc3JjL2VudHJ5LnByZXZpZXcudHN4XCIsXHJcbiAgICBcImJ1aWxkLnNlcnZlclwiOiBcInZpdGUgYnVpbGQgLWMgYWRhcHRlcnMvbmV0bGlmeS1lZGdlL3ZpdGUuY29uZmlnLnRzXCIsXHJcbiAgICBcImJ1aWxkLnNlcnZlci52ZXJjZWxcIjogXCJ2aXRlIGJ1aWxkIC1jIGFkYXB0ZXJzL3ZlcmNlbC1lZGdlL3ZpdGUuY29uZmlnLnRzXCIsXHJcbiAgICBcImJ1aWxkLnR5cGVzXCI6IFwidHNjIC0taW5jcmVtZW50YWwgLS1ub0VtaXRcIixcclxuICAgIFwiZGVwbG95LnZlcmNlbFwiOiBcInZlcmNlbCBkZXBsb3lcIixcclxuICAgIFwiZGVwbG95XCI6IFwibmV0bGlmeSBkZXBsb3lcIixcclxuICAgIFwiZGV2XCI6IFwidml0ZSAtLW1vZGUgc3NyXCIsXHJcbiAgICBcImRldi5kZWJ1Z1wiOiBcIm5vZGUgLS1pbnNwZWN0LWJyayAuL25vZGVfbW9kdWxlcy92aXRlL2Jpbi92aXRlLmpzIC0tbW9kZSBzc3IgLS1mb3JjZVwiLFxyXG4gICAgXCJmbXRcIjogXCJwcmV0dGllciAtLXdyaXRlIC5cIixcclxuICAgIFwiZm10LmNoZWNrXCI6IFwicHJldHRpZXIgLS1jaGVjayAuXCIsXHJcbiAgICBcImdlbmVyYXRlXCI6IFwicHdhLWFzc2V0cy1nZW5lcmF0b3IgLS1wcmVzZXQgbWluaW1hbC0yMDIzIHB1YmxpYy9sb2dvLnN2Z1wiLFxyXG4gICAgXCJsaW50cmVtb3ZlXCI6IFwiZXNsaW50IFxcXCJzcmMvKiovKi50cypcXFwiXCIsXHJcbiAgICBcInByZXZpZXdcIjogXCJxd2lrIGJ1aWxkIHByZXZpZXcgJiYgdml0ZSBwcmV2aWV3IC0tb3BlblwiLFxyXG4gICAgXCJzdGFydFwiOiBcInZpdGUgLS1vcGVuIC0tbW9kZSBzc3JcIixcclxuICAgIFwicXdpa1wiOiBcInF3aWtcIixcclxuICAgIFwidGVzdDplMmVcIjogXCJwbGF5d3JpZ2h0IHRlc3RcIlxyXG4gIH0sXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAcGxheXdyaWdodC90ZXN0XCI6IFwiXjEuNDkuMFwiLFxyXG4gICAgXCJAYnVpbGRlci5pby9xd2lrXCI6IFwiXjEuMTAuMFwiLFxyXG4gICAgXCJAYnVpbGRlci5pby9xd2lrLWNpdHlcIjogXCJeMS4xMC4wXCIsXHJcbiAgICBcIkBjYXRwcHVjY2luL3RhaWx3aW5kY3NzXCI6IFwiXjAuMS42XCIsXHJcbiAgICBcIkBuZXRsaWZ5L2VkZ2UtZnVuY3Rpb25zXCI6IFwiXjIuMTEuMFwiLFxyXG4gICAgXCJAcXdpa2Rldi9wd2FcIjogXCJeMC4wLjRcIixcclxuICAgIFwiQHF3aWtlc3QvaWNvbnNcIjogXCJeMC4wLjEzXCIsXHJcbiAgICBcIkB0eXBlcy9lc2xpbnRcIjogXCI4LjU2LjEwXCIsXHJcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiMjAuMTQuMTFcIixcclxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCI3LjE2LjFcIixcclxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIjcuMTYuMVwiLFxyXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4yMFwiLFxyXG4gICAgXCJjaGVtaWNhbGpzXCI6IFwiXjIuNS4xXCIsXHJcbiAgICBcIm5ldGxpZnktY2xpXCI6IFwiXjE1LjExLjBcIixcclxuICAgIFwibnhcIjogXCJeMjAuMS4yXCIsXHJcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjQ5XCIsXHJcbiAgICBcInByZXR0aWVyXCI6IFwiMy4zLjNcIixcclxuICAgIFwicHJldHRpZXItcGx1Z2luLXRhaWx3aW5kY3NzXCI6IFwiXjAuNS4xNFwiLFxyXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjQuMTVcIixcclxuICAgIFwidGFpbHdpbmRjc3MtYW5pbWF0ZVwiOiBcIl4xLjAuN1wiLFxyXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuNy4yXCIsXHJcbiAgICBcInZpdGVcIjogXCI1LjMuNlwiLFxyXG4gICAgXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI6IFwiXjQuMy4yXCJcclxuICB9LFxyXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQHJhZGl4LXVpL3JlYWN0LWRpYWxvZ1wiOiBcIl4xLjEuMlwiLFxyXG4gICAgXCJAcmFkaXgtdWkvcmVhY3Qtc2VwYXJhdG9yXCI6IFwiXjEuMS4wXCIsXHJcbiAgICBcIkByYWRpeC11aS9yZWFjdC1zbG90XCI6IFwiXjEuMS4wXCIsXHJcbiAgICBcIkByYWRpeC11aS9yZWFjdC10b29sdGlwXCI6IFwiXjEuMS40XCIsXHJcbiAgICBcImNsYXNzLXZhcmlhbmNlLWF1dGhvcml0eVwiOiBcIl4wLjcuMFwiLFxyXG4gICAgXCJsb2NhbGZvcmFnZVwiOiBcIl4xLjEwLjBcIixcclxuICAgIFwiZmlyZWJhc2VcIjogXCJeMTEuMC4yXCIsXHJcbiAgICBcImZpcmViYXNldWlcIjogXCJeNi4xLjBcIixcclxuICAgIFwibHVjaWRlLXJlYWN0XCI6IFwiXjAuNDYwLjBcIixcclxuICAgIFwidGFpbHdpbmQtbWVyZ2VcIjogXCJeMi41LjRcIixcclxuICAgIFwidHlwZWNyaXB0XCI6IFwiXjAuMC4xLXNlY3VyaXR5XCIsXHJcbiAgICBcIndpc3Atc2VydmVyLW5vZGVcIjogXCJeMS4xLjdcIlxyXG4gIH0sXHJcbiAgXCJyZXNvbHV0aW9uc1wiOiB7XHJcbiAgICBcInNoYXJwXCI6IFwiMC4zMi42XCJcclxuICB9LFxyXG4gIFwibnhcIjoge31cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBS0EsU0FBUyxvQkFBcUM7QUFDOUMsU0FBUyxnQkFBZ0I7QUFDekIsU0FBUyxnQkFBZ0I7QUFDekIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsMEJBQTBCO0FBQ25DLE9BQU8sbUJBQW1COzs7QUNWMUI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLGFBQWU7QUFBQSxFQUNmLFNBQVc7QUFBQSxJQUNULE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxzQkFBc0I7QUFBQSxFQUN0QixTQUFXO0FBQUEsRUFDWCxxQkFBdUI7QUFBQSxJQUNyQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxrQ0FBa0M7QUFBQSxFQUNsQyxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsSUFDVCxPQUFTO0FBQUEsSUFDVCxnQkFBZ0I7QUFBQSxJQUNoQixpQkFBaUI7QUFBQSxJQUNqQixnQkFBZ0I7QUFBQSxJQUNoQix1QkFBdUI7QUFBQSxJQUN2QixlQUFlO0FBQUEsSUFDZixpQkFBaUI7QUFBQSxJQUNqQixRQUFVO0FBQUEsSUFDVixLQUFPO0FBQUEsSUFDUCxhQUFhO0FBQUEsSUFDYixLQUFPO0FBQUEsSUFDUCxhQUFhO0FBQUEsSUFDYixVQUFZO0FBQUEsSUFDWixZQUFjO0FBQUEsSUFDZCxTQUFXO0FBQUEsSUFDWCxPQUFTO0FBQUEsSUFDVCxNQUFRO0FBQUEsSUFDUixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsb0JBQW9CO0FBQUEsSUFDcEIseUJBQXlCO0FBQUEsSUFDekIsMkJBQTJCO0FBQUEsSUFDM0IsMkJBQTJCO0FBQUEsSUFDM0IsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsZUFBZTtBQUFBLElBQ2Ysb0NBQW9DO0FBQUEsSUFDcEMsNkJBQTZCO0FBQUEsSUFDN0IsY0FBZ0I7QUFBQSxJQUNoQixZQUFjO0FBQUEsSUFDZCxlQUFlO0FBQUEsSUFDZixJQUFNO0FBQUEsSUFDTixTQUFXO0FBQUEsSUFDWCxVQUFZO0FBQUEsSUFDWiwrQkFBK0I7QUFBQSxJQUMvQixhQUFlO0FBQUEsSUFDZix1QkFBdUI7QUFBQSxJQUN2QixZQUFjO0FBQUEsSUFDZCxNQUFRO0FBQUEsSUFDUix1QkFBdUI7QUFBQSxFQUN6QjtBQUFBLEVBQ0EsY0FBZ0I7QUFBQSxJQUNkLDBCQUEwQjtBQUFBLElBQzFCLDZCQUE2QjtBQUFBLElBQzdCLHdCQUF3QjtBQUFBLElBQ3hCLDJCQUEyQjtBQUFBLElBQzNCLDRCQUE0QjtBQUFBLElBQzVCLGFBQWU7QUFBQSxJQUNmLFVBQVk7QUFBQSxJQUNaLFlBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLFdBQWE7QUFBQSxJQUNiLG9CQUFvQjtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxhQUFlO0FBQUEsSUFDYixPQUFTO0FBQUEsRUFDWDtBQUFBLEVBQ0EsSUFBTSxDQUFDO0FBQ1Q7OztBRDlFQSxJQUFNLEVBQUUsZUFBZSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsRUFBRSxJQUFJO0FBS3BELHlCQUF5QixpQkFBaUIsWUFBWTtBQUt0RCxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFrQjtBQUM3RCxTQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUE7QUFBQSxNQUVOLHdCQUF3QixLQUFLLFVBQVUsYUFBYTtBQUFBLElBQ3REO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFBRyxTQUFTO0FBQUEsTUFBRyxjQUFjO0FBQUEsTUFBRyxRQUFRO0FBQUE7QUFBQSxNQUVqRCxDQUFDO0FBQUEsTUFBRyxtQkFBbUI7QUFBQSxRQUNyQixTQUFTO0FBQUEsUUFDVCxJQUFJO0FBQUEsUUFDSixZQUFZO0FBQUEsUUFDWixjQUFjO0FBQUEsVUFDWixRQUFRO0FBQUEsVUFDUixVQUFVO0FBQUEsUUFDWjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQTtBQUFBLElBRUEsY0FBYztBQUFBO0FBQUEsTUFFWixTQUFTLENBQUM7QUFBQSxJQUNaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQWtCQSxRQUFRO0FBQUEsTUFDTixTQUFTO0FBQUE7QUFBQSxRQUVQLGlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBO0FBQUEsUUFFUCxpQkFBaUI7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQztBQVNELFNBQVMseUJBQ1BBLGtCQUNBQyxlQUNBO0FBQ0EsTUFBSSxNQUFNO0FBR1YsUUFBTSxnQkFBZ0IsT0FBTyxLQUFLRCxnQkFBZSxFQUFFO0FBQUEsSUFDakQsQ0FBQyxRQUFRQyxjQUFhLEdBQUc7QUFBQSxFQUMzQjtBQUdBLFFBQU0sVUFBVSxPQUFPLEtBQUtBLGFBQVksRUFBRTtBQUFBLElBQU8sQ0FBQyxVQUNoRCxRQUFRLEtBQUssS0FBSztBQUFBLEVBQ3BCO0FBSUEsUUFBTSxzQkFBc0IsUUFBUSxLQUFLLElBQUksQ0FBQztBQUU5QyxNQUFJLFFBQVEsU0FBUyxHQUFHO0FBQ3RCLFVBQU0sSUFBSSxNQUFNLEdBQUc7QUFBQSxFQUNyQjtBQUlBLFFBQU07QUFBQSwrQkFDdUIsY0FBYyxLQUFLLElBQUksQ0FBQztBQUFBO0FBQUE7QUFLckQsTUFBSSxjQUFjLFNBQVMsR0FBRztBQUM1QixVQUFNLElBQUksTUFBTSxHQUFHO0FBQUEsRUFDckI7QUFDRjsiLAogICJuYW1lcyI6IFsiZGV2RGVwZW5kZW5jaWVzIiwgImRlcGVuZGVuY2llcyJdCn0K
