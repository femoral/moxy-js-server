import { Request, Response } from "express";
import * as deletePathUseCase from "../../domain/delete-path.usecase";

export async function deletePath(req: Request, res: Response) {
  await deletePathUseCase.execute(req.params.id, req.params.collectionName);
  res.status(204).send();
}
