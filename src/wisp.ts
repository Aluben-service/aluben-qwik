import wisp from "wisp-server-node"
import { createServer } from "node:http";
import { hostname } from "node:os";

const server = createServer();

server.on("request", (req, res) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
});
server.on("upgrade", (req, socket, head) => {
    if (req.url && req.url.endsWith("/wisp/"))
        wisp.routeRequest(req, socket as any, head);
    else
        socket.end();
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8080;

server.on("listening", () => {
    const address = server.address();
    if (address && typeof address === 'object') {
        console.log("Listening on:");
        console.log(`\thttp://localhost:${address.port}`);
        console.log(`\thttp://${hostname()}:${address.port}`);
        console.log(
            `\thttp://${address.family === "IPv6" ? `[${address.address}]` : address.address}:${address.port}`
        );
    } else {
        console.log("Server address is not available");
    }
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close();
    process.exit(0);
}

server.listen({
    port,
});