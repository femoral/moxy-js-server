import { Path, PathMethod } from "./path";
import { Request, Response } from "express";
import { proxyServer } from "../../common/proxy";
import { v4 as uuid } from "uuid";

export class ProxyPath extends Path {
  constructor(
    id = uuid(),
    collection: string,
    path: string,
    method: PathMethod,
    private _target: string
  ) {
    super(id, collection, path, method);
  }

  get target(): string {
    return this._target;
  }

  handler(req: Request, res: Response): void {
    proxyServer.web(req, res, {
      target: this._target + req.path.replace(`/${this.collection}`, ""),
    });
  }

  update(path: ProxyPath): void {
    this._target = path._target;
    this._path = path._path;
    this._collection = path._collection;
    this._method = path._method;
  }
}
