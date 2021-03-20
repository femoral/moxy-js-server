import { Request, Response } from "express";
import * as deleteCollectionUseCase from "../../domain/delete-collection.usecase";
import { validateUuid } from "../../common/validator";

export async function deleteCollection(req: Request, res: Response) {
  const collectionId = req.params.id;
  validateUuid(collectionId);
  res.status(204).send(await deleteCollectionUseCase.execute(collectionId));
}
