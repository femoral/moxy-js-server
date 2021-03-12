import { Collection } from "./model/collection";
import * as getCollectionRepository from "../data/json-collection-info.repository";

export async function getCollection(name: string): Promise<Collection> {
  return await getCollectionRepository.getCollection(name);
}
