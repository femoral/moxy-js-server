import { NextFunction, Request, Response } from "express";
import * as getCollectionsUseCase from "../domain/get-collections.usecase";
import express from "express";
import cors from "cors";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

(async () => {
  const app = express();

  app.use(cors());
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.path);
    next();
  });

  (await getCollectionsUseCase.getCollections()).forEach((collection) =>
    collection.routes.forEach((route) =>
      app[route.method](
        `/${collection.name}${route.path}`,
        route.handler.bind(route)
      )
    )
  );

  app.listen(8081, () => {
    process.send?.(`Child server starting on port: 8081`);
  });
})();
