import { UpdateCollection } from "../domain/repository/collection.repository";
import { Collection } from "../domain/model/collection";
import { CollectionModel, PathMap } from "./model/collection.model";
import { Path } from "../domain/model/path";
import * as pathMapper from "./mapper/path.to.path-model.mapper";
import { promises as fs } from "fs";
import path from "path";

const makeJsonUpdateCollectionRepository = ({
  collectionsBasePath,
}: {
  collectionsBasePath: string;
}): UpdateCollection => async (collection: Collection): Promise<void> => {
  const model: CollectionModel = {
    id: collection.id,
    basePath: collection.basePath,
    name: collection.name,
    paths: collection.paths.reduce((paths: PathMap, path: Path) => {
      paths[path.id] = pathMapper.map(path);
      return paths;
    }, {}),
  };
  await fs.writeFile(
    path.join(collectionsBasePath, collection.id, "collection.json"),
    JSON.stringify(model, undefined, 4)
  );
};

export default makeJsonUpdateCollectionRepository;
