import { Path } from "./model/path";
import {
  GetCollection,
  UpdateCollection,
} from "./repository/collection.repository";

export type UpdatePathUseCase = { execute: (path: Path) => Promise<void> };

const makeUpdatePathUseCase = (collectionRepository: {
  getCollection: GetCollection;
  updateCollection: UpdateCollection;
}): UpdatePathUseCase => {
  const execute = async (path: Path): Promise<void> => {
    const collection = await collectionRepository.getCollection(
      path.collection
    );

    collection.updatePath(path);

    await collectionRepository.updateCollection(collection);
  };

  return {
    execute,
  };
};

export default makeUpdatePathUseCase;
