import { Request, Response } from "express";
import * as createCollectionUseCase from "../../domain/create-collection.usecase";
import * as collectionMapper from "../mapper/collection-dto.to.collection.mapper";
import { validateName } from "./collection.validator";
import { CollectionDto } from "../model/collection.dto";

export async function addCollection(req: Request, res: Response) {
  const collectionDto: CollectionDto = req.body;
  validateName(collectionDto.name);
  const collection = await createCollectionUseCase.execute(
    collectionMapper.map(collectionDto)
  );
  res.status(201).send({ id: collection.id });
}
