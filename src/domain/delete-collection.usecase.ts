import { deleteCollection } from "../data/json-collection-info.repository";

export async function execute(name: string) {
  await deleteCollection(name);
}
