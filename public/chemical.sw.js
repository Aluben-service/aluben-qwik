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

let uv, scramjet;
// Default options, these don't need to be provided on instantiation.
const ww = new WorkerWare({
  debug: false,
  randomNames: false,
  timing: false
});
ww.use({
  // Required
  function: async function(event) {
    const url = new URL(event.request.url);
    if (url.hostname.includes('ads') || url.hostname.includes('analytics') || url.hostname.includes('tracker')) {
      return new Response('', {status: 404});
    }
    return fetch(event.request);
  },
  // Required, can take in multiple events!
  events: ["fetch"],
  // Optional, defaults to function.prototype.name, or is set to a random string if randomNames is set to true.
  name: "Adblock",
  // Optional configuration that can be accessed by the middleware under event.workerware.config
  configuration: {
    foo: "bar"
  }
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
      } else if (scramjetEnabled && scramjet.route(event)) {
        return await scramjet.fetch(event);
      }
      return await fetch(event.request);
    })()
  );
});
