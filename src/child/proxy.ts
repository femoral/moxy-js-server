import { createProxyServer } from "http-proxy";

export const proxyServer = createProxyServer({
  changeOrigin: true,
  secure: false,
  ignorePath: true,
});

proxyServer.on("error", (error, req, res) => {
  console.error(error.message);
  res.writeHead(502, {
    "Content-Type": "text/plain",
  });

  res.end("Failed to proxy request to target");
});
