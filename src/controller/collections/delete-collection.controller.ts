import { Request, Response } from "express";
import * as deleteCollectionUseCase from "../../domain/delete-collection.usecase";
import { validateName } from "./collection.validator";

export async function deleteCollection(req: Request, res: Response) {
  const collectionId = req.params.id;
  validateName(collectionId);
  res.status(204).send(await deleteCollectionUseCase.execute(collectionId));
}
