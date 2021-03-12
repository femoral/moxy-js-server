import { Route } from "./model/route";
import * as collectionRepository from "../data/json-collection-info.repository";

export async function execute(
  collectionName: string,
  routeId: string
): Promise<void> {
  const collection = await collectionRepository.getCollection(routeId);

  collection.deleteRoute(collectionName);

  await collectionRepository.updateCollection(collection);
}
