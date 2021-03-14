import { createCollection } from "../data/json-collection-info.repository";

export async function execute(name: string) {
  await createCollection(name);
}
