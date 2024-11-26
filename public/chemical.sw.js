importScripts("/workerware/workerware.js");

const rammerheadEnabled = true;
const scramjetEnabled = false;
const uvEnabled = true;
if (uvEnabled) {
  importScripts("/uv/uv.bundle.js");
  importScripts("/uv/uv.config.js");
  importScripts(__uv$config.sw || "/uv/uv.sw.js");
}
if (scramjetEnabled) {
  importScripts("/scramjet/scramjet.wasm.js");
  importScripts("/scramjet/scramjet.shared.js");
  importScripts("/scramjet/scramjet.worker.js");
}

if (navigator.userAgent.includes("Firefox")) {
  Object.defineProperty(globalThis, "crossOriginIsolated", {
    value: true,
    writable: false,
  });
}

let uv;
let scramjet;
// Default options, these don't need to be provided on instantiation.
const workerware = new WorkerWare({
  debug: false,
});

// stolen from nebula
if (navigator.userAgent.includes("Firefox")) {
  Object.defineProperty(globalThis, "crossOriginIsolated", {
      value: true,
      writable: true  
  });
}

workerware.use({
  function: async (event) => {
    alert("hi from workerware");
  },
  events: ["fetch"],
});

if (uvEnabled) {
  uv = new UVServiceWorker();
}
if (scramjetEnabled) {
  scramjet = new ScramjetServiceWorker();
}

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      if (scramjetEnabled) {
        await scramjet.loadConfig();
      }

      if (uvEnabled && uv.route(event)) {
        return await uv.fetch(event);
      }
      if (scramjetEnabled && scramjet.route(event)) {
        return await scramjet.fetch(event);
      }
      return await fetch(event.request);
    })()
  );
});
