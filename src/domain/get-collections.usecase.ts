import { Collection } from "./model/collection";
import { GetCollections } from "./repository/collection.repository";

export type GetCollectionsUseCase = { execute: () => Promise<Collection[]> };

const makeGetCollectionsUseCase = (collectionRepository: {
  getCollections: GetCollections;
}): GetCollectionsUseCase => {
  const execute = async (): Promise<Collection[]> =>
    await collectionRepository.getCollections();

  return { execute };
};
export default makeGetCollectionsUseCase;
