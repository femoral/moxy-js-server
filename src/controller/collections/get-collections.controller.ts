import { Request, RequestHandler, Response } from "express";
import * as collectionMapper from "../mapper/collection-dto.to.collection.mapper";
import { GetCollectionsUseCase } from "../../domain/get-collections.usecase";

const makeGetCollectionsController = ({
  getCollectionsUseCase,
}: {
  getCollectionsUseCase: GetCollectionsUseCase;
}): RequestHandler => async (req: Request, res: Response) => {
  res.send(
    (await getCollectionsUseCase.execute()).map((collection) =>
      collectionMapper.reverseMap(collection)
    )
  );
};

export default makeGetCollectionsController;
