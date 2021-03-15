import { Router } from "express";
import { addPath } from "./add-path.controller";
import { updatePath } from "./update-path.controller";
import { deletePath } from "./delete-path.controller";

export const pathsController = Router();

pathsController.post("/:collectionName/paths", addPath);
pathsController.put("/:collectionName/paths/:id", updatePath);
pathsController.delete("/:collectionName/paths/:id", deletePath);
