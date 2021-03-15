import { Path } from "./model/path";
import * as collectionRepository from "../data/json-collection-info.repository";

export async function execute(path: Path): Promise<void> {
  const collection = await collectionRepository.getCollection(path.collection);

  collection.updatePath(path);

  await collectionRepository.updateCollection(collection);
}
