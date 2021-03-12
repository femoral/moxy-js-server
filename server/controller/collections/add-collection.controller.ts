import { Request, Response } from "express";
import * as createCollectionUseCase from "../../domain/create-collection.usecase";
import { validateName } from "./collection.validator";

export async function addCollection(req: Request, res: Response) {
  validateName(req.params.name);
  await createCollectionUseCase.execute(req.params.name);
  res.status(201).send();
}
