import { Route } from "./model/route";
import * as collectionRepository from "../data/json-collection-info.repository";

export async function execute(route: Route): Promise<void> {
  const collection = await collectionRepository.getCollection(route.collection);

  collection.updateRoute(route);

  await collectionRepository.updateCollection(collection);
}
