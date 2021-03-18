import express from "express";
import cors from "cors";
import { collectionsController } from "./controller/collections";
import { pathsController } from "./controller/paths";
import { createProxyServer } from "http-proxy";
import * as childController from "./child/controller";
import fs from "fs";
import { restartMiddleware } from "./child/restart.middleware";
import { COLLECTIONS_PATH, init } from "./common/config";
import { errorMiddleware } from "./common/error.middleware";

const app = express();
const proxyServer = createProxyServer({ target: "http://localhost:8081" });

init();

app.use(cors());
app.use(express.json());
app.use("/collections", collectionsController);
app.use("/collections", restartMiddleware, pathsController);

app.use((req, res) => {
  proxyServer.web(req, res);
});

app.use(errorMiddleware);

app.listen(8080, async () => {
  console.log("Main src started on port 8080");
  await childController.start();

  fs.watch(COLLECTIONS_PATH).on(
    "change",
    async () => await childController.restart()
  );
});
