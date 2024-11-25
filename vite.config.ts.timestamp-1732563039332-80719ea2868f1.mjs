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
    "@biomejs/biome",
    "@netlify/content-engine",
    "@netlify/esbuild",
    "@parcel/watcher",
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
    "build.client": "vite build && npm run i18n-translate",
    "build.css": "sass --watch public/stylesheets/:public/css",
    "build.preview": "vite build --ssr src/entry.preview.tsx",
    "build.server": "vite build -c adapters/netlify-edge/vite.config.ts",
    "build.server.vercel": "vite build -c adapters/vercel-edge/vite.config.ts",
    "build.types": "tsc --incremental --noEmit",
    deploy: "netlify deploy",
    "deploy.vercel": "vercel deploy",
    dev: "vite --mode ssr",
    "dev.debug": "node --inspect-brk ./node_modules/vite/bin/vite.js --mode ssr --force",
    fix: "bunx biome check --apply .",
    fmt: "prettier --write .",
    "fmt.check": "prettier --check .",
    generate: "pwa-assets-generator --preset minimal-2023 public/logo.svg",
    "i18n-extract": 'node_modules/.bin/localize-extract -s "dist/build/*.js" -f json -o src/locales/message.en.json',
    "i18n-translate": 'node_modules/.bin/localize-translate -s "*.js" -t src/locales/message.*.json -o dist/build/{{LOCALE}} -r ./dist/build',
    "prei18n-extract": "vite build",
    preview: "qwik build preview && vite preview --open",
    start: "vite --open --mode ssr",
    "test:e2e": "playwright test",
    qwik: "qwik"
  },
  devDependencies: {
    "@angular/compiler": "^16.2.2",
    "@angular/compiler-cli": "^16.2.2",
    "@biomejs/biome": "^1.9.4",
    "@builder.io/qwik": "^1.10.0",
    "@builder.io/qwik-city": "^1.10.0",
    "@catppuccin/tailwindcss": "^0.1.6",
    "@netlify/edge-functions": "^2.11.0",
    "@playwright/test": "^1.49.0",
    "@qwikdev/pwa": "^0.0.4",
    "@qwikest/icons": "^0.0.13",
    "@types/eslint": "8.56.10",
    "@types/node": "20.14.11",
    "@typescript-eslint/eslint-plugin": "7.16.1",
    "@typescript-eslint/parser": "7.16.1",
    autoprefixer: "^10.4.20",
    chemicaljs: "^2.5.1",
    "eslint-plugin-qwik": "^1.10.0",
    "netlify-cli": "^15.11.0",
    nx: "^20.1.2",
    postcss: "^8.4.49",
    prettier: "3.3.3",
    "prettier-plugin-tailwindcss": "^0.5.14",
    sass: "^1.81.0",
    tailwindcss: "^3.4.15",
    "tailwindcss-animate": "^1.0.7",
    typescript: "<5.6.0",
    vite: "5.3.6",
    "vite-tsconfig-paths": "^4.3.2"
  },
  dependencies: {
    "@angular/localize": "^16.2.2",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.4",
    "@supabase/supabase-js": "^2.46.1",
    "class-variance-authority": "^0.7.0",
    firebase: "^11.0.2",
    firebaseui: "^6.1.0",
    jquery: "4.0.0-beta.2",
    localforage: "^1.10.0",
    "lucide-react": "^0.460.0",
    "tailwind-merge": "^2.5.4",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxca29uZ2ZcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxkZXZcXFxcYWx1YmVuXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxrb25nZlxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXGRldlxcXFxhbHViZW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2tvbmdmL09uZURyaXZlL0Rlc2t0b3AvZGV2L2FsdWJlbi92aXRlLmNvbmZpZy50c1wiO1xyXG4vKipcclxuICogVGhpcyBpcyB0aGUgYmFzZSBjb25maWcgZm9yIHZpdGUuXHJcbiAqIFdoZW4gYnVpbGRpbmcsIHRoZSBhZGFwdGVyIGNvbmZpZyBpcyB1c2VkIHdoaWNoIGxvYWRzIHRoaXMgZmlsZSBhbmQgZXh0ZW5kcyBpdC5cclxuICovXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgcXdpa1ZpdGUgfSBmcm9tIFwiQGJ1aWxkZXIuaW8vcXdpay9vcHRpbWl6ZXJcIjtcclxuaW1wb3J0IHsgcXdpa0NpdHkgfSBmcm9tIFwiQGJ1aWxkZXIuaW8vcXdpay1jaXR5L3ZpdGVcIjtcclxuaW1wb3J0IHsgcXdpa1B3YSB9IGZyb20gXCJAcXdpa2Rldi9wd2FcIjtcclxuaW1wb3J0IHsgQ2hlbWljYWxWaXRlUGx1Z2luIH0gZnJvbSBcImNoZW1pY2FsanNcIjtcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuaW1wb3J0IHBrZyBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcclxuXHJcbnR5cGUgUGtnRGVwID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuY29uc3QgeyBkZXBlbmRlbmNpZXMgPSB7fSwgZGV2RGVwZW5kZW5jaWVzID0ge30gfSA9IHBrZyBhcyBhbnkgYXMge1xyXG4gIGRlcGVuZGVuY2llczogUGtnRGVwO1xyXG4gIGRldkRlcGVuZGVuY2llczogUGtnRGVwO1xyXG4gIFtrZXk6IHN0cmluZ106IHVua25vd247XHJcbn07XHJcbmVycm9yT25EdXBsaWNhdGVzUGtnRGVwcyhkZXZEZXBlbmRlbmNpZXMsIGRlcGVuZGVuY2llcyk7XHJcblxyXG4vKipcclxuICogTm90ZSB0aGF0IFZpdGUgbm9ybWFsbHkgc3RhcnRzIGZyb20gYGluZGV4Lmh0bWxgIGJ1dCB0aGUgcXdpa0NpdHkgcGx1Z2luIG1ha2VzIHN0YXJ0IGF0IGBzcmMvZW50cnkuc3NyLnRzeGAgaW5zdGVhZC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pOiBVc2VyQ29uZmlnID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgIC8vIChvcHRpb25hbCkgZW5hYmxlcyBkZWJ1Z2dpbmcgaW4gd29ya2JveFxyXG4gICAgICBcInByb2Nlc3MuZW52Lk5PREVfRU5WXCI6IEpTT04uc3RyaW5naWZ5KFwiZGV2ZWxvcG1lbnRcIiksXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICBxd2lrQ2l0eSgpLCBxd2lrVml0ZSgpLCB0c2NvbmZpZ1BhdGhzKCksIHF3aWtQd2Eoe1xyXG4gICAgICAgIC8qIG9wdGlvbnMgKi9cclxuICAgICAgfSksIENoZW1pY2FsVml0ZVBsdWdpbih7XHJcbiAgICAgICAgZGVmYXVsdDogJ3V2JyxcclxuICAgICAgICB1djogdHJ1ZSxcclxuICAgICAgICByYW1tZXJoZWFkOiBmYWxzZSxcclxuICAgICAgICBleHBlcmltZW50YWw6IHtcclxuICAgICAgICAgIG1ldGVvcjogdHJ1ZSxcclxuICAgICAgICAgIHNjcmFtamV0OiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgXSxcclxuICAgIC8vIFRoaXMgdGVsbHMgVml0ZSB3aGljaCBkZXBlbmRlbmNpZXMgdG8gcHJlLWJ1aWxkIGluIGRldiBtb2RlLlxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIC8vIFB1dCBwcm9ibGVtYXRpYyBkZXBzIHRoYXQgYnJlYWsgYnVuZGxpbmcgaGVyZSwgbW9zdGx5IHRob3NlIHdpdGggYmluYXJpZXMuXHJcbiAgICAgIGV4Y2x1ZGU6IFtdLFxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBpcyBhbiBhZHZhbmNlZCBzZXR0aW5nLiBJdCBpbXByb3ZlcyB0aGUgYnVuZGxpbmcgb2YgeW91ciBzZXJ2ZXIgY29kZS4gVG8gdXNlIGl0LCBtYWtlIHN1cmUgeW91IHVuZGVyc3RhbmQgd2hlbiB5b3VyIGNvbnN1bWVkIHBhY2thZ2VzIGFyZSBkZXBlbmRlbmNpZXMgb3IgZGV2IGRlcGVuZGVuY2llcy4gKG90aGVyd2lzZSB0aGluZ3Mgd2lsbCBicmVhayBpbiBwcm9kdWN0aW9uKVxyXG4gICAgICovXHJcbiAgICAvLyBzc3I6XHJcbiAgICAvLyAgIGNvbW1hbmQgPT09IFwiYnVpbGRcIiAmJiBtb2RlID09PSBcInByb2R1Y3Rpb25cIlxyXG4gICAgLy8gICAgID8ge1xyXG4gICAgLy8gICAgICAgICAvLyBBbGwgZGV2IGRlcGVuZGVuY2llcyBzaG91bGQgYmUgYnVuZGxlZCBpbiB0aGUgc2VydmVyIGJ1aWxkXHJcbiAgICAvLyAgICAgICAgIG5vRXh0ZXJuYWw6IE9iamVjdC5rZXlzKGRldkRlcGVuZGVuY2llcyksXHJcbiAgICAvLyAgICAgICAgIC8vIEFueXRoaW5nIG1hcmtlZCBhcyBhIGRlcGVuZGVuY3kgd2lsbCBub3QgYmUgYnVuZGxlZFxyXG4gICAgLy8gICAgICAgICAvLyBUaGVzZSBzaG91bGQgb25seSBiZSBwcm9kdWN0aW9uIGJpbmFyeSBkZXBzIChpbmNsdWRpbmcgZGVwcyBvZiBkZXBzKSwgQ0xJIGRlcHMsIGFuZCB0aGVpciBtb2R1bGUgZ3JhcGhcclxuICAgIC8vICAgICAgICAgLy8gSWYgYSBkZXAtb2YtZGVwIG5lZWRzIHRvIGJlIGV4dGVybmFsLCBhZGQgaXQgaGVyZVxyXG4gICAgLy8gICAgICAgICAvLyBGb3IgZXhhbXBsZSwgaWYgc29tZXRoaW5nIHVzZXMgYGJjcnlwdGAgYnV0IHlvdSBkb24ndCBoYXZlIGl0IGFzIGEgZGVwLCB5b3UgY2FuIHdyaXRlXHJcbiAgICAvLyAgICAgICAgIC8vIGV4dGVybmFsOiBbLi4uT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKSwgJ2JjcnlwdCddXHJcbiAgICAvLyAgICAgICAgIGV4dGVybmFsOiBPYmplY3Qua2V5cyhkZXBlbmRlbmNpZXMpLFxyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIDogdW5kZWZpbmVkLFxyXG5cclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgLy8gRG9uJ3QgY2FjaGUgdGhlIHNlcnZlciByZXNwb25zZSBpbiBkZXYgbW9kZVxyXG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcInB1YmxpYywgbWF4LWFnZT0wXCIsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcHJldmlldzoge1xyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgLy8gRG8gY2FjaGUgdGhlIHNlcnZlciByZXNwb25zZSBpbiBwcmV2aWV3IChub24tYWRhcHRlciBwcm9kdWN0aW9uIGJ1aWxkKVxyXG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcInB1YmxpYywgbWF4LWFnZT02MDBcIixcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxufSk7XHJcblxyXG4vLyAqKiogdXRpbHMgKioqXHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gdG8gaWRlbnRpZnkgZHVwbGljYXRlIGRlcGVuZGVuY2llcyBhbmQgdGhyb3cgYW4gZXJyb3JcclxuICogQHBhcmFtIHtPYmplY3R9IGRldkRlcGVuZGVuY2llcyAtIExpc3Qgb2YgZGV2ZWxvcG1lbnQgZGVwZW5kZW5jaWVzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXBlbmRlbmNpZXMgLSBMaXN0IG9mIHByb2R1Y3Rpb24gZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5mdW5jdGlvbiBlcnJvck9uRHVwbGljYXRlc1BrZ0RlcHMoXHJcbiAgZGV2RGVwZW5kZW5jaWVzOiBQa2dEZXAsXHJcbiAgZGVwZW5kZW5jaWVzOiBQa2dEZXAsXHJcbikge1xyXG4gIGxldCBtc2cgPSBcIlwiO1xyXG4gIC8vIENyZWF0ZSBhbiBhcnJheSAnZHVwbGljYXRlRGVwcycgYnkgZmlsdGVyaW5nIGRldkRlcGVuZGVuY2llcy5cclxuICAvLyBJZiBhIGRlcGVuZGVuY3kgYWxzbyBleGlzdHMgaW4gZGVwZW5kZW5jaWVzLCBpdCBpcyBjb25zaWRlcmVkIGEgZHVwbGljYXRlLlxyXG4gIGNvbnN0IGR1cGxpY2F0ZURlcHMgPSBPYmplY3Qua2V5cyhkZXZEZXBlbmRlbmNpZXMpLmZpbHRlcihcclxuICAgIChkZXApID0+IGRlcGVuZGVuY2llc1tkZXBdLFxyXG4gICk7XHJcblxyXG4gIC8vIGluY2x1ZGUgYW55IGtub3duIHF3aWsgcGFja2FnZXNcclxuICBjb25zdCBxd2lrUGtnID0gT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKS5maWx0ZXIoKHZhbHVlKSA9PlxyXG4gICAgL3F3aWsvaS50ZXN0KHZhbHVlKSxcclxuICApO1xyXG5cclxuICAvLyBhbnkgZXJyb3JzIGZvciBtaXNzaW5nIFwicXdpay1jaXR5LXBsYW5cIlxyXG4gIC8vIFtQTFVHSU5fRVJST1JdOiBJbnZhbGlkIG1vZHVsZSBcIkBxd2lrLWNpdHktcGxhblwiIGlzIG5vdCBhIHZhbGlkIHBhY2thZ2VcclxuICBtc2cgPSBgTW92ZSBxd2lrIHBhY2thZ2VzICR7cXdpa1BrZy5qb2luKFwiLCBcIil9IHRvIGRldkRlcGVuZGVuY2llc2A7XHJcblxyXG4gIGlmIChxd2lrUGtnLmxlbmd0aCA+IDApIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xyXG4gIH1cclxuXHJcbiAgLy8gRm9ybWF0IHRoZSBlcnJvciBtZXNzYWdlIHdpdGggdGhlIGR1cGxpY2F0ZXMgbGlzdC5cclxuICAvLyBUaGUgYGpvaW5gIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcmVwcmVzZW50IHRoZSBlbGVtZW50cyBvZiB0aGUgJ2R1cGxpY2F0ZURlcHMnIGFycmF5IGFzIGEgY29tbWEtc2VwYXJhdGVkIHN0cmluZy5cclxuICBtc2cgPSBgXHJcbiAgICBXYXJuaW5nOiBUaGUgZGVwZW5kZW5jeSBcIiR7ZHVwbGljYXRlRGVwcy5qb2luKFwiLCBcIil9XCIgaXMgbGlzdGVkIGluIGJvdGggXCJkZXZEZXBlbmRlbmNpZXNcIiBhbmQgXCJkZXBlbmRlbmNpZXNcIi5cclxuICAgIFBsZWFzZSBtb3ZlIHRoZSBkdXBsaWNhdGVkIGRlcGVuZGVuY2llcyB0byBcImRldkRlcGVuZGVuY2llc1wiIG9ubHkgYW5kIHJlbW92ZSBpdCBmcm9tIFwiZGVwZW5kZW5jaWVzXCJcclxuICBgO1xyXG5cclxuICAvLyBUaHJvdyBhbiBlcnJvciB3aXRoIHRoZSBjb25zdHJ1Y3RlZCBtZXNzYWdlLlxyXG4gIGlmIChkdXBsaWNhdGVEZXBzLmxlbmd0aCA+IDApIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xyXG4gIH1cclxufVxyXG4iLCAie1xuICBcIm5hbWVcIjogXCJteS1xd2lrLWVtcHR5LXN0YXJ0ZXJcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkJsYW5rIHByb2plY3Qgd2l0aCByb3V0aW5nIGluY2x1ZGVkXCIsXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiPj0yMC4wLjBcIlxuICB9LFxuICBcImVuZ2luZXMtYW5ub3RhdGlvblwiOiBcIk1vc3RseSByZXF1aXJlZCBieSBzaGFycCB3aGljaCBuZWVkcyBhIE5vZGUtQVBJIHY5IGNvbXBhdGlibGUgcnVudGltZVwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJ0cnVzdGVkRGVwZW5kZW5jaWVzXCI6IFtcbiAgICBcIkBiaW9tZWpzL2Jpb21lXCIsXG4gICAgXCJAbmV0bGlmeS9jb250ZW50LWVuZ2luZVwiLFxuICAgIFwiQG5ldGxpZnkvZXNidWlsZFwiLFxuICAgIFwiQHBhcmNlbC93YXRjaGVyXCIsXG4gICAgXCJAcnVieW5ldHdvcmsvcmhcIixcbiAgICBcImJ1ZmZlcnV0aWxcIixcbiAgICBcImNvbnRlbnRmdWxcIixcbiAgICBcImRlYXN5bmNcIixcbiAgICBcImVzNS1leHRcIixcbiAgICBcImVzYnVpbGRcIixcbiAgICBcImxtZGJcIixcbiAgICBcIm1zZ3BhY2tyLWV4dHJhY3RcIixcbiAgICBcIm5ldGxpZnktY2xpXCIsXG4gICAgXCJueFwiLFxuICAgIFwicHJvdG9idWZqc1wiLFxuICAgIFwic2hhcnBcIixcbiAgICBcInNxbGl0ZTNcIixcbiAgICBcInV0Zi04LXZhbGlkYXRlXCIsXG4gICAgXCJ2ZXJjZWxcIlxuICBdLFxuICBcInRydXN0ZWREZXBlbmRlbmNpZXMtYW5ub3RhdGlvblwiOiBcIk5lZWRlZCBmb3IgYnVuIHRvIGFsbG93IHJ1bm5pbmcgaW5zdGFsbCBzY3JpcHRzXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJxd2lrIGJ1aWxkXCIsXG4gICAgXCJidWlsZC5jbGllbnRcIjogXCJ2aXRlIGJ1aWxkICYmIG5wbSBydW4gaTE4bi10cmFuc2xhdGVcIixcbiAgICBcImJ1aWxkLmNzc1wiOiBcInNhc3MgLS13YXRjaCBwdWJsaWMvc3R5bGVzaGVldHMvOnB1YmxpYy9jc3NcIixcbiAgICBcImJ1aWxkLnByZXZpZXdcIjogXCJ2aXRlIGJ1aWxkIC0tc3NyIHNyYy9lbnRyeS5wcmV2aWV3LnRzeFwiLFxuICAgIFwiYnVpbGQuc2VydmVyXCI6IFwidml0ZSBidWlsZCAtYyBhZGFwdGVycy9uZXRsaWZ5LWVkZ2Uvdml0ZS5jb25maWcudHNcIixcbiAgICBcImJ1aWxkLnNlcnZlci52ZXJjZWxcIjogXCJ2aXRlIGJ1aWxkIC1jIGFkYXB0ZXJzL3ZlcmNlbC1lZGdlL3ZpdGUuY29uZmlnLnRzXCIsXG4gICAgXCJidWlsZC50eXBlc1wiOiBcInRzYyAtLWluY3JlbWVudGFsIC0tbm9FbWl0XCIsXG4gICAgXCJkZXBsb3lcIjogXCJuZXRsaWZ5IGRlcGxveVwiLFxuICAgIFwiZGVwbG95LnZlcmNlbFwiOiBcInZlcmNlbCBkZXBsb3lcIixcbiAgICBcImRldlwiOiBcInZpdGUgLS1tb2RlIHNzclwiLFxuICAgIFwiZGV2LmRlYnVnXCI6IFwibm9kZSAtLWluc3BlY3QtYnJrIC4vbm9kZV9tb2R1bGVzL3ZpdGUvYmluL3ZpdGUuanMgLS1tb2RlIHNzciAtLWZvcmNlXCIsXG4gICAgXCJmaXhcIjogXCJidW54IGJpb21lIGNoZWNrIC0tYXBwbHkgLlwiLFxuICAgIFwiZm10XCI6IFwicHJldHRpZXIgLS13cml0ZSAuXCIsXG4gICAgXCJmbXQuY2hlY2tcIjogXCJwcmV0dGllciAtLWNoZWNrIC5cIixcbiAgICBcImdlbmVyYXRlXCI6IFwicHdhLWFzc2V0cy1nZW5lcmF0b3IgLS1wcmVzZXQgbWluaW1hbC0yMDIzIHB1YmxpYy9sb2dvLnN2Z1wiLFxuICAgIFwiaTE4bi1leHRyYWN0XCI6IFwibm9kZV9tb2R1bGVzLy5iaW4vbG9jYWxpemUtZXh0cmFjdCAtcyBcXFwiZGlzdC9idWlsZC8qLmpzXFxcIiAtZiBqc29uIC1vIHNyYy9sb2NhbGVzL21lc3NhZ2UuZW4uanNvblwiLFxuICAgIFwiaTE4bi10cmFuc2xhdGVcIjogXCJub2RlX21vZHVsZXMvLmJpbi9sb2NhbGl6ZS10cmFuc2xhdGUgLXMgXFxcIiouanNcXFwiIC10IHNyYy9sb2NhbGVzL21lc3NhZ2UuKi5qc29uIC1vIGRpc3QvYnVpbGQve3tMT0NBTEV9fSAtciAuL2Rpc3QvYnVpbGRcIixcbiAgICBcInByZWkxOG4tZXh0cmFjdFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcInByZXZpZXdcIjogXCJxd2lrIGJ1aWxkIHByZXZpZXcgJiYgdml0ZSBwcmV2aWV3IC0tb3BlblwiLFxuICAgIFwic3RhcnRcIjogXCJ2aXRlIC0tb3BlbiAtLW1vZGUgc3NyXCIsXG4gICAgXCJ0ZXN0OmUyZVwiOiBcInBsYXl3cmlnaHQgdGVzdFwiLFxuICAgIFwicXdpa1wiOiBcInF3aWtcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYW5ndWxhci9jb21waWxlclwiOiBcIl4xNi4yLjJcIixcbiAgICBcIkBhbmd1bGFyL2NvbXBpbGVyLWNsaVwiOiBcIl4xNi4yLjJcIixcbiAgICBcIkBiaW9tZWpzL2Jpb21lXCI6IFwiXjEuOS40XCIsXG4gICAgXCJAYnVpbGRlci5pby9xd2lrXCI6IFwiXjEuMTAuMFwiLFxuICAgIFwiQGJ1aWxkZXIuaW8vcXdpay1jaXR5XCI6IFwiXjEuMTAuMFwiLFxuICAgIFwiQGNhdHBwdWNjaW4vdGFpbHdpbmRjc3NcIjogXCJeMC4xLjZcIixcbiAgICBcIkBuZXRsaWZ5L2VkZ2UtZnVuY3Rpb25zXCI6IFwiXjIuMTEuMFwiLFxuICAgIFwiQHBsYXl3cmlnaHQvdGVzdFwiOiBcIl4xLjQ5LjBcIixcbiAgICBcIkBxd2lrZGV2L3B3YVwiOiBcIl4wLjAuNFwiLFxuICAgIFwiQHF3aWtlc3QvaWNvbnNcIjogXCJeMC4wLjEzXCIsXG4gICAgXCJAdHlwZXMvZXNsaW50XCI6IFwiOC41Ni4xMFwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCIyMC4xNC4xMVwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCI3LjE2LjFcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCI3LjE2LjFcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjIwXCIsXG4gICAgXCJjaGVtaWNhbGpzXCI6IFwiXjIuNS4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXF3aWtcIjogXCJeMS4xMC4wXCIsXG4gICAgXCJuZXRsaWZ5LWNsaVwiOiBcIl4xNS4xMS4wXCIsXG4gICAgXCJueFwiOiBcIl4yMC4xLjJcIixcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjQ5XCIsXG4gICAgXCJwcmV0dGllclwiOiBcIjMuMy4zXCIsXG4gICAgXCJwcmV0dGllci1wbHVnaW4tdGFpbHdpbmRjc3NcIjogXCJeMC41LjE0XCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuODEuMFwiLFxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjE1XCIsXG4gICAgXCJ0YWlsd2luZGNzcy1hbmltYXRlXCI6IFwiXjEuMC43XCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiPDUuNi4wXCIsXG4gICAgXCJ2aXRlXCI6IFwiNS4zLjZcIixcbiAgICBcInZpdGUtdHNjb25maWctcGF0aHNcIjogXCJeNC4zLjJcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYW5ndWxhci9sb2NhbGl6ZVwiOiBcIl4xNi4yLjJcIixcbiAgICBcIkByYWRpeC11aS9yZWFjdC1kaWFsb2dcIjogXCJeMS4xLjJcIixcbiAgICBcIkByYWRpeC11aS9yZWFjdC1zZXBhcmF0b3JcIjogXCJeMS4xLjBcIixcbiAgICBcIkByYWRpeC11aS9yZWFjdC1zbG90XCI6IFwiXjEuMS4wXCIsXG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtdG9vbHRpcFwiOiBcIl4xLjEuNFwiLFxuICAgIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCI6IFwiXjIuNDYuMVwiLFxuICAgIFwiY2xhc3MtdmFyaWFuY2UtYXV0aG9yaXR5XCI6IFwiXjAuNy4wXCIsXG4gICAgXCJmaXJlYmFzZVwiOiBcIl4xMS4wLjJcIixcbiAgICBcImZpcmViYXNldWlcIjogXCJeNi4xLjBcIixcbiAgICBcImpxdWVyeVwiOiBcIjQuMC4wLWJldGEuMlwiLFxuICAgIFwibG9jYWxmb3JhZ2VcIjogXCJeMS4xMC4wXCIsXG4gICAgXCJsdWNpZGUtcmVhY3RcIjogXCJeMC40NjAuMFwiLFxuICAgIFwidGFpbHdpbmQtbWVyZ2VcIjogXCJeMi41LjRcIixcbiAgICBcIndpc3Atc2VydmVyLW5vZGVcIjogXCJeMS4xLjdcIlxuICB9LFxuICBcInJlc29sdXRpb25zXCI6IHtcbiAgICBcInNoYXJwXCI6IFwiMC4zMi42XCJcbiAgfSxcbiAgXCJueFwiOiB7fVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUtBLFNBQVMsb0JBQXFDO0FBQzlDLFNBQVMsZ0JBQWdCO0FBQ3pCLFNBQVMsZ0JBQWdCO0FBQ3pCLFNBQVMsZUFBZTtBQUN4QixTQUFTLDBCQUEwQjtBQUNuQyxPQUFPLG1CQUFtQjs7O0FDVjFCO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixhQUFlO0FBQUEsRUFDZixTQUFXO0FBQUEsSUFDVCxNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0Esc0JBQXNCO0FBQUEsRUFDdEIsU0FBVztBQUFBLEVBQ1gscUJBQXVCO0FBQUEsSUFDckI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxrQ0FBa0M7QUFBQSxFQUNsQyxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsSUFDVCxPQUFTO0FBQUEsSUFDVCxnQkFBZ0I7QUFBQSxJQUNoQixhQUFhO0FBQUEsSUFDYixpQkFBaUI7QUFBQSxJQUNqQixnQkFBZ0I7QUFBQSxJQUNoQix1QkFBdUI7QUFBQSxJQUN2QixlQUFlO0FBQUEsSUFDZixRQUFVO0FBQUEsSUFDVixpQkFBaUI7QUFBQSxJQUNqQixLQUFPO0FBQUEsSUFDUCxhQUFhO0FBQUEsSUFDYixLQUFPO0FBQUEsSUFDUCxLQUFPO0FBQUEsSUFDUCxhQUFhO0FBQUEsSUFDYixVQUFZO0FBQUEsSUFDWixnQkFBZ0I7QUFBQSxJQUNoQixrQkFBa0I7QUFBQSxJQUNsQixtQkFBbUI7QUFBQSxJQUNuQixTQUFXO0FBQUEsSUFDWCxPQUFTO0FBQUEsSUFDVCxZQUFZO0FBQUEsSUFDWixNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUEsSUFDekIsa0JBQWtCO0FBQUEsSUFDbEIsb0JBQW9CO0FBQUEsSUFDcEIseUJBQXlCO0FBQUEsSUFDekIsMkJBQTJCO0FBQUEsSUFDM0IsMkJBQTJCO0FBQUEsSUFDM0Isb0JBQW9CO0FBQUEsSUFDcEIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsZUFBZTtBQUFBLElBQ2Ysb0NBQW9DO0FBQUEsSUFDcEMsNkJBQTZCO0FBQUEsSUFDN0IsY0FBZ0I7QUFBQSxJQUNoQixZQUFjO0FBQUEsSUFDZCxzQkFBc0I7QUFBQSxJQUN0QixlQUFlO0FBQUEsSUFDZixJQUFNO0FBQUEsSUFDTixTQUFXO0FBQUEsSUFDWCxVQUFZO0FBQUEsSUFDWiwrQkFBK0I7QUFBQSxJQUMvQixNQUFRO0FBQUEsSUFDUixhQUFlO0FBQUEsSUFDZix1QkFBdUI7QUFBQSxJQUN2QixZQUFjO0FBQUEsSUFDZCxNQUFRO0FBQUEsSUFDUix1QkFBdUI7QUFBQSxFQUN6QjtBQUFBLEVBQ0EsY0FBZ0I7QUFBQSxJQUNkLHFCQUFxQjtBQUFBLElBQ3JCLDBCQUEwQjtBQUFBLElBQzFCLDZCQUE2QjtBQUFBLElBQzdCLHdCQUF3QjtBQUFBLElBQ3hCLDJCQUEyQjtBQUFBLElBQzNCLHlCQUF5QjtBQUFBLElBQ3pCLDRCQUE0QjtBQUFBLElBQzVCLFVBQVk7QUFBQSxJQUNaLFlBQWM7QUFBQSxJQUNkLFFBQVU7QUFBQSxJQUNWLGFBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxhQUFlO0FBQUEsSUFDYixPQUFTO0FBQUEsRUFDWDtBQUFBLEVBQ0EsSUFBTSxDQUFDO0FBQ1Q7OztBRDNGQSxJQUFNLEVBQUUsZUFBZSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsRUFBRSxJQUFJO0FBS3BELHlCQUF5QixpQkFBaUIsWUFBWTtBQUt0RCxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFrQjtBQUM3RCxTQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUE7QUFBQSxNQUVOLHdCQUF3QixLQUFLLFVBQVUsYUFBYTtBQUFBLElBQ3REO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFBRyxTQUFTO0FBQUEsTUFBRyxjQUFjO0FBQUEsTUFBRyxRQUFRO0FBQUE7QUFBQSxNQUVqRCxDQUFDO0FBQUEsTUFBRyxtQkFBbUI7QUFBQSxRQUNyQixTQUFTO0FBQUEsUUFDVCxJQUFJO0FBQUEsUUFDSixZQUFZO0FBQUEsUUFDWixjQUFjO0FBQUEsVUFDWixRQUFRO0FBQUEsVUFDUixVQUFVO0FBQUEsUUFDWjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQTtBQUFBLElBRUEsY0FBYztBQUFBO0FBQUEsTUFFWixTQUFTLENBQUM7QUFBQSxJQUNaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQWtCQSxRQUFRO0FBQUEsTUFDTixTQUFTO0FBQUE7QUFBQSxRQUVQLGlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBO0FBQUEsUUFFUCxpQkFBaUI7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQztBQVNELFNBQVMseUJBQ1BBLGtCQUNBQyxlQUNBO0FBQ0EsTUFBSSxNQUFNO0FBR1YsUUFBTSxnQkFBZ0IsT0FBTyxLQUFLRCxnQkFBZSxFQUFFO0FBQUEsSUFDakQsQ0FBQyxRQUFRQyxjQUFhLEdBQUc7QUFBQSxFQUMzQjtBQUdBLFFBQU0sVUFBVSxPQUFPLEtBQUtBLGFBQVksRUFBRTtBQUFBLElBQU8sQ0FBQyxVQUNoRCxRQUFRLEtBQUssS0FBSztBQUFBLEVBQ3BCO0FBSUEsUUFBTSxzQkFBc0IsUUFBUSxLQUFLLElBQUksQ0FBQztBQUU5QyxNQUFJLFFBQVEsU0FBUyxHQUFHO0FBQ3RCLFVBQU0sSUFBSSxNQUFNLEdBQUc7QUFBQSxFQUNyQjtBQUlBLFFBQU07QUFBQSwrQkFDdUIsY0FBYyxLQUFLLElBQUksQ0FBQztBQUFBO0FBQUE7QUFLckQsTUFBSSxjQUFjLFNBQVMsR0FBRztBQUM1QixVQUFNLElBQUksTUFBTSxHQUFHO0FBQUEsRUFDckI7QUFDRjsiLAogICJuYW1lcyI6IFsiZGV2RGVwZW5kZW5jaWVzIiwgImRlcGVuZGVuY2llcyJdCn0K
