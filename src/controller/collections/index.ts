import { Router } from "express";
import { getCollections } from "./get-collections.controller";
import { addCollection } from "./add-collection.controller";
import { getCollection } from "./get-collection.controller";
import { restartMiddleware } from "../middleware/restart.middleware";
import { deleteCollection } from "./delete-collection.controller";
import { catchErrors } from "../middleware/error.middleware";
import { addCollectionValidator } from "./schema/add-collection.schema";
import { schemaMiddleware } from "../middleware/schema.middleware";
import { updateCollectionValidator } from "./schema/update-collection.schema";

export const collectionsController = Router();

collectionsController.get("/", catchErrors(getCollections));
collectionsController.get("/:id", catchErrors(getCollection));
collectionsController.post(
  "/",
  schemaMiddleware(addCollectionValidator),
  restartMiddleware,
  catchErrors(addCollection)
);
collectionsController.put(
  "/:id",
  schemaMiddleware(updateCollectionValidator),
  restartMiddleware,
  catchErrors(addCollection)
);
collectionsController.delete(
  "/:id",
  restartMiddleware,
  catchErrors(deleteCollection)
);
