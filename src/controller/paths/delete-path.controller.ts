import { Request, Response } from "express";
import * as deletePathUseCase from "../../domain/delete-path.usecase";
import { validateUuid } from "../../common/validator";

export async function deletePath(req: Request, res: Response) {
  validateUuid(req.params.collectionId);
  validateUuid(req.params.id);
  await deletePathUseCase.execute(req.params.collectionId, req.params.id);
  res.status(204).send();
}
