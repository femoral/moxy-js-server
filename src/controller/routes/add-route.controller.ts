import { Request, Response } from "express";
import * as addRouteUseCase from "../../domain/add-route.usecase";
import * as routeDtoToRouteMapper from "../mapper/route-dto.to.route.mapper";

export async function addRoute(req: Request, res: Response) {
  res.status(201).send({
    id: await addRouteUseCase.execute(
      routeDtoToRouteMapper.map({
        collection: req.params.collectionName,
        ...req.body,
      })
    ),
  });
}
