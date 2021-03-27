import express from "express";
import cors from "cors";
import { collectionsController } from "./controller/collections";
import { pathsController } from "./controller/paths";
import { createProxyServer } from "http-proxy";
import * as childController from "./child/controller";
import { restartMiddleware } from "./controller/middleware/restart.middleware";
import { init } from "./common/config";
import { errorMiddleware } from "./controller/middleware/error.middleware";
import { childPort, port } from "./common/args";

export const app = express();

const proxyServer = createProxyServer({
  target: `http://localhost:${childPort}`,
});

init();

app.use(cors());
app.use(express.json());
app.use("/collections", collectionsController);
app.use("/collections", restartMiddleware, pathsController);

app.use((req, res) => {
  proxyServer.web(req, res);
});

app.use(errorMiddleware);

if (require.main === module)
  app.listen(port, async () => {
    console.log(`API server started on port ${port}`);
    await childController.start();
  });
