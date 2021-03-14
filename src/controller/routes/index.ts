import { Router } from "express";
import { addRoute } from "./add-route.controller";
import { updateRoute } from "./update-route.controller";
import { deleteRoute } from "./delete-route.controller";

export const routesController = Router();

routesController.post("/:collectionName/routes", addRoute);
routesController.put("/:collectionName/routes/:id", updateRoute);
routesController.delete("/:collectionName/routes/:id", deleteRoute);
