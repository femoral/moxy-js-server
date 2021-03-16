import * as collectionRepository from "../data/json-collection-info.repository";

export async function execute(
  collectionId: string,
  pathId: string
): Promise<void> {
  const collection = await collectionRepository.getCollection(collectionId);

  collection.removePath(pathId);

  await collectionRepository.updateCollection(collection);
}
