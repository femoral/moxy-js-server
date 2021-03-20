import { NextFunction, Request, Response } from "express";
import { restart } from "../../child/controller";

export function restartMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.on("close", async () => {
    if (req.statusCode && req.statusCode < 400) await restart();
  });
  next();
}
