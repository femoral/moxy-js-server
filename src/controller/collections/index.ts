import { Router } from "express";
import { getCollections } from "./get-collections.controller";
import { addCollection } from "./add-collection.controller";
import { getCollection } from "./get-collection.controller";
import { restartMiddleware } from "../../child/restart.middleware";
import { deleteCollection } from "./delete-collection.controller";

export const collectionsController = Router();

collectionsController.get("/", getCollections);
collectionsController.get("/:id", getCollection);
collectionsController.post("/:id", restartMiddleware, addCollection);
collectionsController.delete("/:id", restartMiddleware, deleteCollection);
