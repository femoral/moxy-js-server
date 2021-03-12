import { Route, RouteMethod } from "./route";
import { Request, Response } from "express";
import { proxyServer } from "../../common/proxy";
import { v4 as uuid } from "uuid";

export class ProxyRoute extends Route {
  constructor(
    id = uuid(),
    collection: string,
    path: string,
    method: RouteMethod,
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

  update(route: ProxyRoute): void {
    this._target = route._target;
    this._path = route._path;
    this._collection = route._collection;
    this._method = route._method;
  }
}
