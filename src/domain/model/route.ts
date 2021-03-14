import { Request, Response } from "express";

export abstract class Route {
  protected constructor(
    protected _id: string,
    protected _collection: string,
    protected _path: string,
    protected _method: RouteMethod
  ) {}

  get id(): string {
    return this._id;
  }

  get collection(): string {
    return this._collection;
  }

  get path(): string {
    return this._path;
  }

  get method(): RouteMethod {
    return this._method;
  }

  abstract handler(req: Request, res: Response): void;

  abstract update(route: Route): void;
}

export type RouteMethod = "get" | "post" | "patch" | "options" | "put" | "all";
