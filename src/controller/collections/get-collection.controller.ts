import { Request, Response } from "express";
import * as getCollectionUseCase from "../../domain/get-collection.usecase";
import * as collectionMapper from "../mapper/collection-dto.to.collection.mapper";
import { validateUuid } from "../../common/validator";

export async function getCollection(req: Request, res: Response) {
  const collectionId = req.params.id;
  validateUuid(collectionId);
  res.send(
    collectionMapper.reverseMap(
      await getCollectionUseCase.getCollection(collectionId)
    )
  );
}
