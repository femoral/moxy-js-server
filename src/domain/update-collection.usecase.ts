import { updateCollection } from "../data/json-collection-info.repository";
import { Collection } from "./model/collection";

export async function execute(collection: Collection): Promise<void> {
  await updateCollection(collection);
}
