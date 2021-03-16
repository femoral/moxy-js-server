import { Request, Response } from "express";
import * as getCollectionsUseCase from "../../domain/get-collections.usecase";
import * as collectionMapper from "../mapper/collection-dto.to.collection.mapper";

export async function getCollections(req: Request, res: Response) {
  res.send(
    (await getCollectionsUseCase.getCollections()).map((collection) =>
      collectionMapper.reverseMap(collection)
    )
  );
}
