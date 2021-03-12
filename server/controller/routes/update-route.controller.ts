import { Request, Response } from "express";
import * as updateRouteUseCase from "../../domain/update-route.usecase";
import * as routeDtoToRouteMapper from "../mapper/route-dto.to.route.mapper";

export async function updateRoute(req: Request, res: Response) {
  await updateRouteUseCase.execute(
    routeDtoToRouteMapper.map({
      id: req.params.id,
      collection: req.params.collectionName,
      ...req.body,
    })
  );
  res.status(204).send();
}
