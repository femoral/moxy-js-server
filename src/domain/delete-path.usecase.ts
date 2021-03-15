import * as collectionRepository from "../data/json-collection-info.repository";

export async function execute(
  collectionName: string,
  pathId: string
): Promise<void> {
  const collection = await collectionRepository.getCollection(pathId);

  collection.deletePath(collectionName);

  await collectionRepository.updateCollection(collection);
}
