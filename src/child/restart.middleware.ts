import { Handler, NextFunction, Request, Response } from "express";
import { restart } from "./controller";

export function restartMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.on("close", async () => {
    await restart();
  });
  next();
}
