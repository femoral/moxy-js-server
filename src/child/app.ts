import express, { NextFunction, Request, Response } from "express";
import * as getCollectionsUseCase from "../domain/get-collections.usecase";
import cors from "cors";
import { childPort } from "../common/args";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

(async () => {
  const app = express();

  app.use(cors());
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method.toUpperCase()} ${req.path}`);
    next();
  });

  (await getCollectionsUseCase.getCollections()).forEach((collection) => {
    try {
      collection.paths.forEach((path) => {
        try {
          app[path.method](
            `/${collection.basePath}${path.path}`,
            path.handler.bind(path)
          );
        } catch (e) {
          console.error(
            `failed to load path: ${path.id} on collection: ${collection.name}`
          );
        }
      });
    } catch (e) {
      console.error(
        `failed to load collection: ${collection.id} - ${collection.name}`
      );
    }
  });

  app.listen(childPort, () => {
    process.send?.(`Moxy server starting on port: ${childPort}`);
  });
})();
