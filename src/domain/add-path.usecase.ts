import { Path } from "./model/path";
import * as collectionRepository from "../data/json-collection-info.repository";

export async function execute(path: Path): Promise<string> {
  const collection = await collectionRepository.getCollection(path.collection);

  collection.addPath(path);

  await collectionRepository.updateCollection(collection);

  return path.id;
}
