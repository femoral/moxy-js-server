import { Request, RequestHandler, Response } from "express";
import { DeletePathUseCase } from "../../domain/delete-path.usecase";
import { validateUuid } from "../../common/validator";

const makeDeletePathController = ({
  deletePathUseCase,
}: {
  deletePathUseCase: DeletePathUseCase;
}): RequestHandler => async (req: Request, res: Response) => {
  validateUuid(req.params.collectionId);
  validateUuid(req.params.id);
  await deletePathUseCase.execute(req.params.collectionId, req.params.id);
  res.status(204).send();
};
export default makeDeletePathController;
