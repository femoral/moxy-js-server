import { Request, Response } from "express";
import * as updateCollectionUseCase from "../../domain/update-collection.usecase";
import * as collectionMapper from "../mapper/collection-dto.to.collection.mapper";
import { CollectionDto } from "../model/collection.dto";
import { validateUuid } from "../../common/validator";

export async function updateCollection(req: Request, res: Response) {
  validateUuid(req.params.id);
  const collectionDto: CollectionDto = { ...req.body, id: req.params.id };
  await updateCollectionUseCase.execute(collectionMapper.map(collectionDto));
  res.status(204).send();
}
