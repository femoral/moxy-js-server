import { Request, RequestHandler, Response } from "express";
import { AddPathUseCase } from "../../domain/add-path.usecase";
import * as pathDtoToPathMapper from "../mapper/path-dto.to.path.mapper";

const makeAddPathController = ({
  addPathUseCase,
}: {
  addPathUseCase: AddPathUseCase;
}): RequestHandler => async (req: Request, res: Response) => {
  res.status(201).send({
    id: await addPathUseCase.execute(
      pathDtoToPathMapper.map({
        collection: req.params.collectionId,
        ...req.body,
      })
    ),
  });
};
export default makeAddPathController;
