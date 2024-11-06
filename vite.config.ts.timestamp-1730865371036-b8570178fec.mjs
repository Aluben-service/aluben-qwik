// vite.config.ts
import { defineConfig } from "file:///C:/Users/allis/OneDrive/Desktop/coding%20files/aluben-qwik/node_modules/vite/dist/node/index.js";
import { qwikVite } from "file:///C:/Users/allis/OneDrive/Desktop/coding%20files/aluben-qwik/node_modules/@builder.io/qwik/dist/optimizer.mjs";
import { qwikCity } from "file:///C:/Users/allis/OneDrive/Desktop/coding%20files/aluben-qwik/node_modules/@builder.io/qwik-city/lib/vite/index.mjs";
import { ChemicalVitePlugin } from "file:///C:/Users/allis/OneDrive/Desktop/coding%20files/aluben-qwik/node_modules/chemicaljs/index.js";
import tsconfigPaths from "file:///C:/Users/allis/OneDrive/Desktop/coding%20files/aluben-qwik/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var package_default = {
  name: "my-qwik-empty-starter",
  description: "Blank project with routing included",
  engines: {
    node: "^18.17.0 || ^20.3.0 || >=21.0.0"
  },
  "engines-annotation": "Mostly required by sharp which needs a Node-API v9 compatible runtime",
  private: true,
  trustedDependencies: [
    "@rubynetwork/rh",
    "bufferutil",
    "esbuild",
    "netlify-cli",
    "sharp"
  ],
  "trustedDependencies-annotation": "Needed for bun to allow running install scripts",
  type: "module",
  scripts: {
    build: "qwik build && bun run build.ts",
    "build.client": "vite build",
    "build.preview": "vite build --ssr src/entry.preview.tsx",
    "build.server": "vite build -c adapters/netlify-edge/vite.config.ts",
    "build.types": "tsc --incremental --noEmit",
    deploy: "netlify deploy --build",
    dev: "vite --mode ssr",
    "dev.debug": "node --inspect-brk ./node_modules/vite/bin/vite.js --mode ssr --force",
    fmt: "prettier --write .",
    "fmt.check": "prettier --check .",
    lintremove: 'eslint "src/**/*.ts*"',
    preview: "qwik build preview && vite preview --open",
    start: "vite --open --mode ssr",
    qwik: "qwik"
  },
  devDependencies: {
    "@builder.io/qwik": "^1.9.1",
    "@builder.io/qwik-city": "^1.9.1",
    "@netlify/edge-functions": "^2.0.0",
    "@types/bun": "latest",
    "@types/eslint": "8.56.10",
    "@types/node": "20.14.11",
    "@typescript-eslint/eslint-plugin": "7.16.1",
    "@typescript-eslint/parser": "7.16.1",
    autoprefixer: "^10.4.19",
    chemicaljs: "^1.9.0",
    "netlify-cli": "^15.0.0",
    postcss: "^8.4.39",
    prettier: "3.3.3",
    "prettier-plugin-tailwindcss": "^0.5.4",
    tailwindcss: "^3.4.6",
    typescript: "5.4.5",
    undici: "^6.20.1",
    vite: "5.3.6",
    "vite-tsconfig-paths": "^4.3.2"
  },
  dependencies: {
    bcryptjs: "^2.4.3",
    localforage: "^1.10.0",
    mysql2: "^3.11.3",
    sqlite: "^5.1.1",
    sqlite3: "^5.1.7",
    sweetalert2: "^11.14.4"
  }
};

// vite.config.ts
var { dependencies = {}, devDependencies = {} } = package_default;
errorOnDuplicatesPkgDeps(devDependencies, dependencies);
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(), ChemicalVitePlugin({ default: "uv", uv: true, rammerhead: true })],
    // This tells Vite which dependencies to pre-build in dev mode.
    optimizeDeps: {
      // Put problematic deps that break bundling here, mostly those with binaries.
      // For example ['better-sqlite3'] if you use that in server functions.
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYWxsaXNcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxjb2RpbmcgZmlsZXNcXFxcYWx1YmVuLXF3aWtcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFsbGlzXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcY29kaW5nIGZpbGVzXFxcXGFsdWJlbi1xd2lrXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbGxpcy9PbmVEcml2ZS9EZXNrdG9wL2NvZGluZyUyMGZpbGVzL2FsdWJlbi1xd2lrL3ZpdGUuY29uZmlnLnRzXCI7LyoqXHJcbiAqIFRoaXMgaXMgdGhlIGJhc2UgY29uZmlnIGZvciB2aXRlLlxyXG4gKiBXaGVuIGJ1aWxkaW5nLCB0aGUgYWRhcHRlciBjb25maWcgaXMgdXNlZCB3aGljaCBsb2FkcyB0aGlzIGZpbGUgYW5kIGV4dGVuZHMgaXQuXHJcbiAqL1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIHR5cGUgVXNlckNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB7IHF3aWtWaXRlIH0gZnJvbSBcIkBidWlsZGVyLmlvL3F3aWsvb3B0aW1pemVyXCI7XHJcbmltcG9ydCB7IHF3aWtDaXR5IH0gZnJvbSBcIkBidWlsZGVyLmlvL3F3aWstY2l0eS92aXRlXCI7XHJcbmltcG9ydCB7IENoZW1pY2FsVml0ZVBsdWdpbiB9IGZyb20gXCJjaGVtaWNhbGpzXCI7XHJcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XHJcbmltcG9ydCBwa2cgZnJvbSBcIi4vcGFja2FnZS5qc29uXCI7XHJcbmltcG9ydCB7IHVzZVZpc2libGVUYXNrJCB9IGZyb20gXCJAYnVpbGRlci5pby9xd2lrXCI7XHJcblxyXG50eXBlIFBrZ0RlcCA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XHJcbmNvbnN0IHsgZGVwZW5kZW5jaWVzID0ge30sIGRldkRlcGVuZGVuY2llcyA9IHt9IH0gPSBwa2cgYXMgYW55IGFzIHtcclxuICBkZXBlbmRlbmNpZXM6IFBrZ0RlcDtcclxuICBkZXZEZXBlbmRlbmNpZXM6IFBrZ0RlcDtcclxuICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xyXG59O1xyXG5lcnJvck9uRHVwbGljYXRlc1BrZ0RlcHMoZGV2RGVwZW5kZW5jaWVzLCBkZXBlbmRlbmNpZXMpO1xyXG5cclxuLyoqXHJcbiAqIE5vdGUgdGhhdCBWaXRlIG5vcm1hbGx5IHN0YXJ0cyBmcm9tIGBpbmRleC5odG1sYCBidXQgdGhlIHF3aWtDaXR5IHBsdWdpbiBtYWtlcyBzdGFydCBhdCBgc3JjL2VudHJ5LnNzci50c3hgIGluc3RlYWQuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KTogVXNlckNvbmZpZyA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHBsdWdpbnM6IFtxd2lrQ2l0eSgpLCBxd2lrVml0ZSgpLCB0c2NvbmZpZ1BhdGhzKCksIENoZW1pY2FsVml0ZVBsdWdpbih7ZGVmYXVsdDogJ3V2JywgdXY6IHRydWUsIHJhbW1lcmhlYWQ6IHRydWV9KV0sXHJcbiAgICAvLyBUaGlzIHRlbGxzIFZpdGUgd2hpY2ggZGVwZW5kZW5jaWVzIHRvIHByZS1idWlsZCBpbiBkZXYgbW9kZS5cclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICAvLyBQdXQgcHJvYmxlbWF0aWMgZGVwcyB0aGF0IGJyZWFrIGJ1bmRsaW5nIGhlcmUsIG1vc3RseSB0aG9zZSB3aXRoIGJpbmFyaWVzLlxyXG4gICAgICAvLyBGb3IgZXhhbXBsZSBbJ2JldHRlci1zcWxpdGUzJ10gaWYgeW91IHVzZSB0aGF0IGluIHNlcnZlciBmdW5jdGlvbnMuXHJcbiAgICAgIGV4Y2x1ZGU6IFtdLFxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgaXMgYW4gYWR2YW5jZWQgc2V0dGluZy4gSXQgaW1wcm92ZXMgdGhlIGJ1bmRsaW5nIG9mIHlvdXIgc2VydmVyIGNvZGUuIFRvIHVzZSBpdCwgbWFrZSBzdXJlIHlvdSB1bmRlcnN0YW5kIHdoZW4geW91ciBjb25zdW1lZCBwYWNrYWdlcyBhcmUgZGVwZW5kZW5jaWVzIG9yIGRldiBkZXBlbmRlbmNpZXMuIChvdGhlcndpc2UgdGhpbmdzIHdpbGwgYnJlYWsgaW4gcHJvZHVjdGlvbilcclxuICAgICAqL1xyXG4gICAgLy8gc3NyOlxyXG4gICAgLy8gICBjb21tYW5kID09PSBcImJ1aWxkXCIgJiYgbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCJcclxuICAgIC8vICAgICA/IHtcclxuICAgIC8vICAgICAgICAgLy8gQWxsIGRldiBkZXBlbmRlbmNpZXMgc2hvdWxkIGJlIGJ1bmRsZWQgaW4gdGhlIHNlcnZlciBidWlsZFxyXG4gICAgLy8gICAgICAgICBub0V4dGVybmFsOiBPYmplY3Qua2V5cyhkZXZEZXBlbmRlbmNpZXMpLFxyXG4gICAgLy8gICAgICAgICAvLyBBbnl0aGluZyBtYXJrZWQgYXMgYSBkZXBlbmRlbmN5IHdpbGwgbm90IGJlIGJ1bmRsZWRcclxuICAgIC8vICAgICAgICAgLy8gVGhlc2Ugc2hvdWxkIG9ubHkgYmUgcHJvZHVjdGlvbiBiaW5hcnkgZGVwcyAoaW5jbHVkaW5nIGRlcHMgb2YgZGVwcyksIENMSSBkZXBzLCBhbmQgdGhlaXIgbW9kdWxlIGdyYXBoXHJcbiAgICAvLyAgICAgICAgIC8vIElmIGEgZGVwLW9mLWRlcCBuZWVkcyB0byBiZSBleHRlcm5hbCwgYWRkIGl0IGhlcmVcclxuICAgIC8vICAgICAgICAgLy8gRm9yIGV4YW1wbGUsIGlmIHNvbWV0aGluZyB1c2VzIGBiY3J5cHRgIGJ1dCB5b3UgZG9uJ3QgaGF2ZSBpdCBhcyBhIGRlcCwgeW91IGNhbiB3cml0ZVxyXG4gICAgLy8gICAgICAgICAvLyBleHRlcm5hbDogWy4uLk9iamVjdC5rZXlzKGRlcGVuZGVuY2llcyksICdiY3J5cHQnXVxyXG4gICAgLy8gICAgICAgICBleHRlcm5hbDogT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKSxcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vICAgICA6IHVuZGVmaW5lZCxcclxuXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIC8vIERvbid0IGNhY2hlIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaW4gZGV2IG1vZGVcclxuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJwdWJsaWMsIG1heC1hZ2U9MFwiLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHByZXZpZXc6IHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIC8vIERvIGNhY2hlIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaW4gcHJldmlldyAobm9uLWFkYXB0ZXIgcHJvZHVjdGlvbiBidWlsZClcclxuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJwdWJsaWMsIG1heC1hZ2U9NjAwXCIsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH07XHJcbn0pO1xyXG5cclxuLy8gKioqIHV0aWxzICoqKlxyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIHRvIGlkZW50aWZ5IGR1cGxpY2F0ZSBkZXBlbmRlbmNpZXMgYW5kIHRocm93IGFuIGVycm9yXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXZEZXBlbmRlbmNpZXMgLSBMaXN0IG9mIGRldmVsb3BtZW50IGRlcGVuZGVuY2llc1xyXG4gKiBAcGFyYW0ge09iamVjdH0gZGVwZW5kZW5jaWVzIC0gTGlzdCBvZiBwcm9kdWN0aW9uIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuZnVuY3Rpb24gZXJyb3JPbkR1cGxpY2F0ZXNQa2dEZXBzKFxyXG4gIGRldkRlcGVuZGVuY2llczogUGtnRGVwLFxyXG4gIGRlcGVuZGVuY2llczogUGtnRGVwLFxyXG4pIHtcclxuICBsZXQgbXNnID0gXCJcIjtcclxuICAvLyBDcmVhdGUgYW4gYXJyYXkgJ2R1cGxpY2F0ZURlcHMnIGJ5IGZpbHRlcmluZyBkZXZEZXBlbmRlbmNpZXMuXHJcbiAgLy8gSWYgYSBkZXBlbmRlbmN5IGFsc28gZXhpc3RzIGluIGRlcGVuZGVuY2llcywgaXQgaXMgY29uc2lkZXJlZCBhIGR1cGxpY2F0ZS5cclxuICBjb25zdCBkdXBsaWNhdGVEZXBzID0gT2JqZWN0LmtleXMoZGV2RGVwZW5kZW5jaWVzKS5maWx0ZXIoXHJcbiAgICAoZGVwKSA9PiBkZXBlbmRlbmNpZXNbZGVwXSxcclxuICApO1xyXG5cclxuICAvLyBpbmNsdWRlIGFueSBrbm93biBxd2lrIHBhY2thZ2VzXHJcbiAgY29uc3QgcXdpa1BrZyA9IE9iamVjdC5rZXlzKGRlcGVuZGVuY2llcykuZmlsdGVyKCh2YWx1ZSkgPT5cclxuICAgIC9xd2lrL2kudGVzdCh2YWx1ZSksXHJcbiAgKTtcclxuXHJcbiAgLy8gYW55IGVycm9ycyBmb3IgbWlzc2luZyBcInF3aWstY2l0eS1wbGFuXCJcclxuICAvLyBbUExVR0lOX0VSUk9SXTogSW52YWxpZCBtb2R1bGUgXCJAcXdpay1jaXR5LXBsYW5cIiBpcyBub3QgYSB2YWxpZCBwYWNrYWdlXHJcbiAgbXNnID0gYE1vdmUgcXdpayBwYWNrYWdlcyAke3F3aWtQa2cuam9pbihcIiwgXCIpfSB0byBkZXZEZXBlbmRlbmNpZXNgO1xyXG5cclxuICBpZiAocXdpa1BrZy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuICB9XHJcblxyXG4gIC8vIEZvcm1hdCB0aGUgZXJyb3IgbWVzc2FnZSB3aXRoIHRoZSBkdXBsaWNhdGVzIGxpc3QuXHJcbiAgLy8gVGhlIGBqb2luYCBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlcHJlc2VudCB0aGUgZWxlbWVudHMgb2YgdGhlICdkdXBsaWNhdGVEZXBzJyBhcnJheSBhcyBhIGNvbW1hLXNlcGFyYXRlZCBzdHJpbmcuXHJcbiAgbXNnID0gYFxyXG4gICAgV2FybmluZzogVGhlIGRlcGVuZGVuY3kgXCIke2R1cGxpY2F0ZURlcHMuam9pbihcIiwgXCIpfVwiIGlzIGxpc3RlZCBpbiBib3RoIFwiZGV2RGVwZW5kZW5jaWVzXCIgYW5kIFwiZGVwZW5kZW5jaWVzXCIuXHJcbiAgICBQbGVhc2UgbW92ZSB0aGUgZHVwbGljYXRlZCBkZXBlbmRlbmNpZXMgdG8gXCJkZXZEZXBlbmRlbmNpZXNcIiBvbmx5IGFuZCByZW1vdmUgaXQgZnJvbSBcImRlcGVuZGVuY2llc1wiXHJcbiAgYDtcclxuXHJcbiAgLy8gVGhyb3cgYW4gZXJyb3Igd2l0aCB0aGUgY29uc3RydWN0ZWQgbWVzc2FnZS5cclxuICBpZiAoZHVwbGljYXRlRGVwcy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuICB9XHJcbn1cclxuIiwgIntcclxuICBcIm5hbWVcIjogXCJteS1xd2lrLWVtcHR5LXN0YXJ0ZXJcIixcclxuICBcImRlc2NyaXB0aW9uXCI6IFwiQmxhbmsgcHJvamVjdCB3aXRoIHJvdXRpbmcgaW5jbHVkZWRcIixcclxuICBcImVuZ2luZXNcIjoge1xyXG4gICAgXCJub2RlXCI6IFwiXjE4LjE3LjAgfHwgXjIwLjMuMCB8fCA+PTIxLjAuMFwiXHJcbiAgfSxcclxuICBcImVuZ2luZXMtYW5ub3RhdGlvblwiOiBcIk1vc3RseSByZXF1aXJlZCBieSBzaGFycCB3aGljaCBuZWVkcyBhIE5vZGUtQVBJIHY5IGNvbXBhdGlibGUgcnVudGltZVwiLFxyXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxyXG4gIFwidHJ1c3RlZERlcGVuZGVuY2llc1wiOiBbXHJcbiAgICBcIkBydWJ5bmV0d29yay9yaFwiLFxyXG4gICAgXCJidWZmZXJ1dGlsXCIsXHJcbiAgICBcImVzYnVpbGRcIixcclxuICAgIFwibmV0bGlmeS1jbGlcIixcclxuICAgIFwic2hhcnBcIlxyXG4gIF0sXHJcbiAgXCJ0cnVzdGVkRGVwZW5kZW5jaWVzLWFubm90YXRpb25cIjogXCJOZWVkZWQgZm9yIGJ1biB0byBhbGxvdyBydW5uaW5nIGluc3RhbGwgc2NyaXB0c1wiLFxyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcImJ1aWxkXCI6IFwicXdpayBidWlsZCAmJiBidW4gcnVuIGJ1aWxkLnRzXCIsXHJcbiAgICBcImJ1aWxkLmNsaWVudFwiOiBcInZpdGUgYnVpbGRcIixcclxuICAgIFwiYnVpbGQucHJldmlld1wiOiBcInZpdGUgYnVpbGQgLS1zc3Igc3JjL2VudHJ5LnByZXZpZXcudHN4XCIsXHJcbiAgICBcImJ1aWxkLnNlcnZlclwiOiBcInZpdGUgYnVpbGQgLWMgYWRhcHRlcnMvbmV0bGlmeS1lZGdlL3ZpdGUuY29uZmlnLnRzXCIsXHJcbiAgICBcImJ1aWxkLnR5cGVzXCI6IFwidHNjIC0taW5jcmVtZW50YWwgLS1ub0VtaXRcIixcclxuICAgIFwiZGVwbG95XCI6IFwibmV0bGlmeSBkZXBsb3kgLS1idWlsZFwiLFxyXG4gICAgXCJkZXZcIjogXCJ2aXRlIC0tbW9kZSBzc3JcIixcclxuICAgIFwiZGV2LmRlYnVnXCI6IFwibm9kZSAtLWluc3BlY3QtYnJrIC4vbm9kZV9tb2R1bGVzL3ZpdGUvYmluL3ZpdGUuanMgLS1tb2RlIHNzciAtLWZvcmNlXCIsXHJcbiAgICBcImZtdFwiOiBcInByZXR0aWVyIC0td3JpdGUgLlwiLFxyXG4gICAgXCJmbXQuY2hlY2tcIjogXCJwcmV0dGllciAtLWNoZWNrIC5cIixcclxuICAgIFwibGludHJlbW92ZVwiOiBcImVzbGludCBcXFwic3JjLyoqLyoudHMqXFxcIlwiLFxyXG4gICAgXCJwcmV2aWV3XCI6IFwicXdpayBidWlsZCBwcmV2aWV3ICYmIHZpdGUgcHJldmlldyAtLW9wZW5cIixcclxuICAgIFwic3RhcnRcIjogXCJ2aXRlIC0tb3BlbiAtLW1vZGUgc3NyXCIsXHJcbiAgICBcInF3aWtcIjogXCJxd2lrXCJcclxuICB9LFxyXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQGJ1aWxkZXIuaW8vcXdpa1wiOiBcIl4xLjkuMVwiLFxyXG4gICAgXCJAYnVpbGRlci5pby9xd2lrLWNpdHlcIjogXCJeMS45LjFcIixcclxuICAgIFwiQG5ldGxpZnkvZWRnZS1mdW5jdGlvbnNcIjogXCJeMi4wLjBcIixcclxuICAgIFwiQHR5cGVzL2J1blwiOiBcImxhdGVzdFwiLFxyXG4gICAgXCJAdHlwZXMvZXNsaW50XCI6IFwiOC41Ni4xMFwiLFxyXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIjIwLjE0LjExXCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiNy4xNi4xXCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCI3LjE2LjFcIixcclxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTlcIixcclxuICAgIFwiY2hlbWljYWxqc1wiOiBcIl4xLjkuMFwiLFxyXG4gICAgXCJuZXRsaWZ5LWNsaVwiOiBcIl4xNS4wLjBcIixcclxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzlcIixcclxuICAgIFwicHJldHRpZXJcIjogXCIzLjMuM1wiLFxyXG4gICAgXCJwcmV0dGllci1wbHVnaW4tdGFpbHdpbmRjc3NcIjogXCJeMC41LjRcIixcclxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjZcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIjUuNC41XCIsXHJcbiAgICBcInVuZGljaVwiOiBcIl42LjIwLjFcIixcclxuICAgIFwidml0ZVwiOiBcIjUuMy42XCIsXHJcbiAgICBcInZpdGUtdHNjb25maWctcGF0aHNcIjogXCJeNC4zLjJcIlxyXG4gIH0sXHJcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJiY3J5cHRqc1wiOiBcIl4yLjQuM1wiLFxyXG4gICAgXCJsb2NhbGZvcmFnZVwiOiBcIl4xLjEwLjBcIixcclxuICAgIFwibXlzcWwyXCI6IFwiXjMuMTEuM1wiLFxyXG4gICAgXCJzcWxpdGVcIjogXCJeNS4xLjFcIixcclxuICAgIFwic3FsaXRlM1wiOiBcIl41LjEuN1wiLFxyXG4gICAgXCJzd2VldGFsZXJ0MlwiOiBcIl4xMS4xNC40XCJcclxuICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUlBLFNBQVMsb0JBQXFDO0FBQzlDLFNBQVMsZ0JBQWdCO0FBQ3pCLFNBQVMsZ0JBQWdCO0FBQ3pCLFNBQVMsMEJBQTBCO0FBQ25DLE9BQU8sbUJBQW1COzs7QUNSMUI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLGFBQWU7QUFBQSxFQUNmLFNBQVc7QUFBQSxJQUNULE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxzQkFBc0I7QUFBQSxFQUN0QixTQUFXO0FBQUEsRUFDWCxxQkFBdUI7QUFBQSxJQUNyQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxrQ0FBa0M7QUFBQSxFQUNsQyxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsSUFDVCxPQUFTO0FBQUEsSUFDVCxnQkFBZ0I7QUFBQSxJQUNoQixpQkFBaUI7QUFBQSxJQUNqQixnQkFBZ0I7QUFBQSxJQUNoQixlQUFlO0FBQUEsSUFDZixRQUFVO0FBQUEsSUFDVixLQUFPO0FBQUEsSUFDUCxhQUFhO0FBQUEsSUFDYixLQUFPO0FBQUEsSUFDUCxhQUFhO0FBQUEsSUFDYixZQUFjO0FBQUEsSUFDZCxTQUFXO0FBQUEsSUFDWCxPQUFTO0FBQUEsSUFDVCxNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIseUJBQXlCO0FBQUEsSUFDekIsMkJBQTJCO0FBQUEsSUFDM0IsY0FBYztBQUFBLElBQ2QsaUJBQWlCO0FBQUEsSUFDakIsZUFBZTtBQUFBLElBQ2Ysb0NBQW9DO0FBQUEsSUFDcEMsNkJBQTZCO0FBQUEsSUFDN0IsY0FBZ0I7QUFBQSxJQUNoQixZQUFjO0FBQUEsSUFDZCxlQUFlO0FBQUEsSUFDZixTQUFXO0FBQUEsSUFDWCxVQUFZO0FBQUEsSUFDWiwrQkFBK0I7QUFBQSxJQUMvQixhQUFlO0FBQUEsSUFDZixZQUFjO0FBQUEsSUFDZCxRQUFVO0FBQUEsSUFDVixNQUFRO0FBQUEsSUFDUix1QkFBdUI7QUFBQSxFQUN6QjtBQUFBLEVBQ0EsY0FBZ0I7QUFBQSxJQUNkLFVBQVk7QUFBQSxJQUNaLGFBQWU7QUFBQSxJQUNmLFFBQVU7QUFBQSxJQUNWLFFBQVU7QUFBQSxJQUNWLFNBQVc7QUFBQSxJQUNYLGFBQWU7QUFBQSxFQUNqQjtBQUNGOzs7QURqREEsSUFBTSxFQUFFLGVBQWUsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLEVBQUUsSUFBSTtBQUtwRCx5QkFBeUIsaUJBQWlCLFlBQVk7QUFLdEQsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBa0I7QUFDN0QsU0FBTztBQUFBLElBQ0wsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLEdBQUcsY0FBYyxHQUFHLG1CQUFtQixFQUFDLFNBQVMsTUFBTSxJQUFJLE1BQU0sWUFBWSxLQUFJLENBQUMsQ0FBQztBQUFBO0FBQUEsSUFFbEgsY0FBYztBQUFBO0FBQUE7QUFBQSxNQUdaLFNBQVMsQ0FBQztBQUFBLElBQ1o7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBbUJBLFFBQVE7QUFBQSxNQUNOLFNBQVM7QUFBQTtBQUFBLFFBRVAsaUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUE7QUFBQSxRQUVQLGlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FBU0QsU0FBUyx5QkFDUEEsa0JBQ0FDLGVBQ0E7QUFDQSxNQUFJLE1BQU07QUFHVixRQUFNLGdCQUFnQixPQUFPLEtBQUtELGdCQUFlLEVBQUU7QUFBQSxJQUNqRCxDQUFDLFFBQVFDLGNBQWEsR0FBRztBQUFBLEVBQzNCO0FBR0EsUUFBTSxVQUFVLE9BQU8sS0FBS0EsYUFBWSxFQUFFO0FBQUEsSUFBTyxDQUFDLFVBQ2hELFFBQVEsS0FBSyxLQUFLO0FBQUEsRUFDcEI7QUFJQSxRQUFNLHNCQUFzQixRQUFRLEtBQUssSUFBSSxDQUFDO0FBRTlDLE1BQUksUUFBUSxTQUFTLEdBQUc7QUFDdEIsVUFBTSxJQUFJLE1BQU0sR0FBRztBQUFBLEVBQ3JCO0FBSUEsUUFBTTtBQUFBLCtCQUN1QixjQUFjLEtBQUssSUFBSSxDQUFDO0FBQUE7QUFBQTtBQUtyRCxNQUFJLGNBQWMsU0FBUyxHQUFHO0FBQzVCLFVBQU0sSUFBSSxNQUFNLEdBQUc7QUFBQSxFQUNyQjtBQUNGOyIsCiAgIm5hbWVzIjogWyJkZXZEZXBlbmRlbmNpZXMiLCAiZGVwZW5kZW5jaWVzIl0KfQo=
