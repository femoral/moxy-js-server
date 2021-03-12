import { Route, RouteMethod } from "./route";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

export class MockRoute extends Route {
  constructor(
    id = uuid(),
    collection: string,
    path: string,
    method: RouteMethod,
    private _responseBody: string,
    private _contentType = "application/json",
    private _encoded = false
  ) {
    super(id, collection, path, method);
  }

  get responseBody(): string {
    return this._responseBody;
  }

  get contentType(): string {
    return this._contentType;
  }

  get encoded(): boolean {
    return this._encoded;
  }

  handler(req: Request, res: Response): void {
    res.contentType(this._contentType).send(this._responseBody);
  }

  update(route: MockRoute): void {
    this._contentType = route._contentType;
    this._encoded = route._encoded;
    this._responseBody = route._responseBody;
    this._method = route._method;
    this._collection = route._collection;
    this._path = route._path;
  }
}
