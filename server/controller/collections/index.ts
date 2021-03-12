import { Router } from "express";
import { getCollections } from "./get-collections.controller";
import { addCollection } from "./add-collection.controller";
import { getCollection } from "./get-collection.controller";
import { restartMiddleware } from "../../child/restart.middleware";

export const collectionsController = Router();

collectionsController.get("/", getCollections);
collectionsController.get("/:name", getCollection);
collectionsController.post("/:name", restartMiddleware, addCollection);
