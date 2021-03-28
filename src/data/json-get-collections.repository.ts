import { Collection } from "../domain/model/collection";
import { promises as fs } from "fs";
import {
  GetCollection,
  GetCollections,
} from "../domain/repository/collection.repository";

const makeJsonGetCollectionsRepository = ({
  collectionsBasePath,
  getCollection,
}: {
  collectionsBasePath: string;
  getCollection: GetCollection;
}): GetCollections => async (): Promise<Collection[]> =>
  Promise.all(
    (await fs.readdir(collectionsBasePath, { withFileTypes: true }))
      .filter((dirEntry) => dirEntry.isDirectory())
      .map((dirEntry) => getCollection(dirEntry.name))
  );
export default makeJsonGetCollectionsRepository;
