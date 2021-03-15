import { Request, Response } from "express";
import * as getCollectionUseCase from "../../domain/get-collection.usecase";
import { validateName } from "./collection.validator";
import * as collectionMapper from "../mapper/collection-dto.to.path.mapper";

export async function getCollection(req: Request, res: Response) {
  const collectionName = req.params.name;
  validateName(collectionName);
  res.send(
    collectionMapper.reverseMap(
      await getCollectionUseCase.getCollection(collectionName)
    )
  );
}
