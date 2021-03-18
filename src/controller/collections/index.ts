import { Router } from "express";
import { getCollections } from "./get-collections.controller";
import { addCollection } from "./add-collection.controller";
import { getCollection } from "./get-collection.controller";
import { restartMiddleware } from "../../child/restart.middleware";
import { deleteCollection } from "./delete-collection.controller";
import { catchErrors } from "../../common/error.middleware";

export const collectionsController = Router();

collectionsController.get("/", catchErrors(getCollections));
collectionsController.get("/:id", catchErrors(getCollection));
collectionsController.post(
  "/:id",
  restartMiddleware,
  catchErrors(addCollection)
);
collectionsController.delete(
  "/:id",
  restartMiddleware,
  catchErrors(deleteCollection)
);
