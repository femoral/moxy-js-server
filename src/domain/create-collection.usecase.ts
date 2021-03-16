import { createCollection } from "../data/json-collection-info.repository";
import { Collection } from "./model/collection";

export async function execute(name: string): Promise<Collection> {
  const collection = new Collection(undefined, name);
  await createCollection(collection);
  return collection;
}
