import { Route } from "./model/route";
import * as collectionRepository from "../data/json-collection-info.repository";

export async function execute(route: Route): Promise<string> {
  const collection = await collectionRepository.getCollection(route.collection);

  collection.addRoute(route);

  await collectionRepository.updateCollection(collection);

  return route.id;
}
