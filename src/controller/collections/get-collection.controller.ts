import { Request, Response } from "express";
import * as getCollectionUseCase from "../../domain/get-collection.usecase";
import { validateName } from "./collection.validator";
import * as collectionMapper from "../mapper/collection-dto.to.collection.mapper";

export async function getCollection(req: Request, res: Response) {
  const collectionId = req.params.id;
  validateName(collectionId);
  res.send(
    collectionMapper.reverseMap(
      await getCollectionUseCase.getCollection(collectionId)
    )
  );
}
