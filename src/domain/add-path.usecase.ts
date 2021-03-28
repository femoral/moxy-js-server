import { Path } from "./model/path";
import { Collection } from "./model/collection";

export type AddPathUseCase = { execute: (path: Path) => Promise<string> };

const makeAddPathUseCase = (collectionRepository: {
  getCollection: (collectionId: string) => Promise<Collection>;
  updateCollection: (collection: Collection) => Promise<void>;
}): AddPathUseCase => {
  const execute = async (path: Path): Promise<string> => {
    const collection = await collectionRepository.getCollection(
      path.collection
    );

    collection.addPath(path);

    await collectionRepository.updateCollection(collection);

    return path.id;
  };

  return {
    execute,
  };
};

export default makeAddPathUseCase;
