import { Request, Response } from "express";
import * as updatePathUseCase from "../../domain/update-path.usecase";
import * as pathDtoToPathMapper from "../mapper/path-dto.to.path.mapper";
import { validateUuid } from "../../common/validator";

export async function updatePath(req: Request, res: Response) {
  validateUuid(req.params.collectionId);
  validateUuid(req.params.id);
  await updatePathUseCase.execute(
    pathDtoToPathMapper.map({
      id: req.params.id,
      collection: req.params.collectionId,
      ...req.body,
    })
  );
  res.status(204).send();
}
