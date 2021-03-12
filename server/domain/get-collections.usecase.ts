import { Collection } from "./model/collection";
import * as collectionRepository from "../data/json-collection-info.repository";

export async function getCollections(): Promise<Collection[]> {
  return await collectionRepository.getCollections();
}
