import { Request, Response } from "express";
import * as addPathUseCase from "../../domain/add-path.usecase";
import * as pathDtoToPathMapper from "../mapper/path-dto.to.path.mapper";

export async function addPath(req: Request, res: Response) {
  res.status(201).send({
    id: await addPathUseCase.execute(
      pathDtoToPathMapper.map({
        collection: req.params.collectionName,
        ...req.body,
      })
    ),
  });
}
