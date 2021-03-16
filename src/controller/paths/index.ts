import { Router } from "express";
import { addPath } from "./add-path.controller";
import { updatePath } from "./update-path.controller";
import { deletePath } from "./delete-path.controller";

export const pathsController = Router();

pathsController.post("/:collectionId/paths", addPath);
pathsController.put("/:collectionId/paths/:id", updatePath);
pathsController.delete("/:collectionId/paths/:id", deletePath);
