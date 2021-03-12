import { Request, Response } from "express";
import * as deleteRouteUseCase from "../../domain/delete-route.usecase";

export async function deleteRoute(req: Request, res: Response) {
  await deleteRouteUseCase.execute(req.params.id, req.params.collectionName);
  res.status(204).send();
}
