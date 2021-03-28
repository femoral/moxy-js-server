import express, { RequestHandler, Router } from "express";
import collectionsRouter from "./collections";
import pathsRouter from "./paths";
import { errorMiddleware } from "./middleware/error.middleware";
import bootstrapApp from "../common/bootstrap";

const makeMoxyApiRouter = ({
  childPort,
  configPath,
  restartMiddleware,
}: {
  childPort: string;
  configPath: string;
  restartMiddleware: RequestHandler;
}) => {
  const {
    addCollection,
    deleteCollection,
    getCollection,
    getCollections,
    updateCollection,
    addPath,
    deletePath,
    updatePath,
    defaultHandler,
  } = bootstrapApp({ childPort, configPath });

  const router = Router();

  router.use(express.json());
  router.use(
    "/collections",
    collectionsRouter({
      addCollection,
      deleteCollection,
      getCollection,
      getCollections,
      updateCollection,
      restartMiddleware,
    })
  );
  router.use(
    "/collections",
    restartMiddleware,
    pathsRouter({
      addPath,
      deletePath,
      updatePath,
    })
  );

  router.use(defaultHandler.web);
  router.use(errorMiddleware);

  return router;
};
export default makeMoxyApiRouter;