import { createProxyServer } from "http-proxy";

export const proxyServer = createProxyServer({
  changeOrigin: true,
  secure: false,
  ignorePath: true,
});
