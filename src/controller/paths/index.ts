import { Router } from "express";
import { addPath } from "./add-path.controller";
import { updatePath } from "./update-path.controller";
import { deletePath } from "./delete-path.controller";
import { catchErrors } from "../../common/error.middleware";

export const pathsController = Router();

pathsController.post("/:collectionId/paths", catchErrors(addPath));
pathsController.put("/:collectionId/paths/:id", catchErrors(updatePath));
pathsController.delete("/:collectionId/paths/:id", catchErrors(deletePath));
