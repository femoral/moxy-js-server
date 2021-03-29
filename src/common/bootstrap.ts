import { createProxyServer } from "http-proxy";
import makeJsonCreateCollectionRepository from "../data/json-create-collection.repository";
import makeJsonGetCollectionRepository from "../data/json-get-collection.repository";
import makeJsonGetCollectionsRepository from "../data/json-get-collections.repository";
import makeJsonUpdateCollectionRepository from "../data/json-update-collection.repository";
import makeJsonDeleteCollectionRepository from "../data/json-delete-collection.repository";
import makeAddPathUseCase from "../domain/add-path.usecase";
import makeAddPathController from "../controller/paths/add-path.controller";
import makeAddCollectionController from "../controller/collections/add-collection.controller";
import makeCreateCollectionUseCase from "../domain/create-collection.usecase";
import makeGetCollectionUseCase from "../domain/get-collection.usecase";
import makeGetCollectionsUseCase from "../domain/get-collections.usecase";
import makeUpdatePathUseCase from "../domain/update-path.usecase";
import makeDeletePathUseCase from "../domain/delete-path.usecase";
import { join } from "path";
import makeDeleteCollectionController from "../controller/collections/delete-collection.controller";
import makeDeleteCollectionUseCase from "../domain/delete-collection.usecase";
import makeGetCollectionController from "../controller/collections/get-collection.controller";
import makeGetCollectionsController from "../controller/collections/get-collections.controller";
import makeUpdateCollectionController from "../controller/collections/update-collection.controller";
import makeUpdateCollectionUseCase from "../domain/update-collection.usecase";
import makeDeletePathController from "../controller/paths/delete-path.controller";
import makeUpdatePathController from "../controller/paths/update-path.controller";
import { Request, Response } from "express";

export type AppConfig = {
  childPort: string;
  configPath: string;
};

const bootstrapApp = ({ childPort, configPath }: AppConfig): any => {
  const collectionsBasePath = join(configPath, "collections");

  const createCollectionRepository = makeJsonCreateCollectionRepository({
    collectionsBasePath,
  });
  const getCollectionRepository = makeJsonGetCollectionRepository({
    collectionsBasePath,
  });
  const getCollectionsRepository = makeJsonGetCollectionsRepository({
    collectionsBasePath,
    getCollection: getCollectionRepository,
  });
  const updateCollectionRepository = makeJsonUpdateCollectionRepository({
    collectionsBasePath,
  });
  const deleteCollectionRepository = makeJsonDeleteCollectionRepository({
    collectionsBasePath,
  });

  const proxyServer = createProxyServer({
    target: `http://localhost:${childPort}`,
  });

  proxyServer.on("error", (error, req, res) => {
    console.error(error.message);
    res.writeHead(502, {
      "Content-Type": "text/plain",
    });

    res.end("Failed to proxy request to child server");
  });

  return {
    addCollection: makeAddCollectionController({
      createCollectionUseCase: makeCreateCollectionUseCase({
        createCollection: createCollectionRepository,
      }),
    }),
    deleteCollection: makeDeleteCollectionController({
      deleteCollectionUseCase: makeDeleteCollectionUseCase({
        deleteCollection: deleteCollectionRepository,
      }),
    }),
    getCollection: makeGetCollectionController({
      getCollectionUseCase: makeGetCollectionUseCase({
        getCollection: getCollectionRepository,
      }),
    }),
    getCollections: makeGetCollectionsController({
      getCollectionsUseCase: makeGetCollectionsUseCase({
        getCollections: getCollectionsRepository,
      }),
    }),
    updateCollection: makeUpdateCollectionController({
      updateCollectionUseCase: makeUpdateCollectionUseCase({
        updateCollection: updateCollectionRepository,
      }),
    }),
    addPath: makeAddPathController({
      addPathUseCase: makeAddPathUseCase({
        getCollection: getCollectionRepository,
        updateCollection: updateCollectionRepository,
      }),
    }),
    deletePath: makeDeletePathController({
      deletePathUseCase: makeDeletePathUseCase({
        getCollection: getCollectionRepository,
        updateCollection: updateCollectionRepository,
      }),
    }),
    updatePath: makeUpdatePathController({
      updatePathUseCase: makeUpdatePathUseCase({
        updateCollection: updateCollectionRepository,
        getCollection: getCollectionRepository,
      }),
    }),
    defaultHandler: (req: Request, res: Response) => proxyServer.web(req, res),
  };
};
export default bootstrapApp;
