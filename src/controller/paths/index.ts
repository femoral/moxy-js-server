import { Router } from "express";
import { addPath } from "./add-path.controller";
import { updatePath } from "./update-path.controller";
import { deletePath } from "./delete-path.controller";
import { catchErrors } from "../middleware/error.middleware";
import { addPathValidator } from "./schema/add-path.schema";
import { schemaMiddleware } from "../middleware/schema.middleware";
import { updatePathValidator } from "./schema/update-path.schema";

export const pathsController = Router();

pathsController.post(
  "/:collectionId/paths",
  schemaMiddleware(addPathValidator),
  catchErrors(addPath)
);
pathsController.put(
  "/:collectionId/paths/:id",
  schemaMiddleware(updatePathValidator),
  catchErrors(updatePath)
);
pathsController.delete("/:collectionId/paths/:id", catchErrors(deletePath));
