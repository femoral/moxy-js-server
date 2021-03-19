import { createCollection } from "../data/json-collection-info.repository";
import { Collection } from "./model/collection";

export async function execute(collection: Collection): Promise<Collection> {
  await createCollection(collection);
  return collection;
}
