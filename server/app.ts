import express from "express";
import cors from "cors";
import { collectionsController } from "./controller/collections";
import { routesController } from "./controller/routes";
import { createProxyServer } from "http-proxy";
import * as childController from "./child/controller";
import fs from "fs";
import { restartMiddleware } from "./child/restart.middleware";
import { COLLECTIONS_PATH, init } from "./common/config";

const app = express();
const proxyServer = createProxyServer({ target: "http://localhost:8081" });

init();

app.use(cors());
app.use(express.json());
app.use("/collections", collectionsController);
app.use("/collections", restartMiddleware, routesController);

app.use((req, res) => {
  proxyServer.web(req, res);
});

app.listen(8080, async () => {
  console.log("Main server started on port 8080");
  await childController.start();

  fs.watch(COLLECTIONS_PATH).on(
    "change",
    async () => await childController.restart()
  );
});
