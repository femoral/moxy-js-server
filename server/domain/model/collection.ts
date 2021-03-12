import { Route } from "./route";

export class Collection {
  constructor(private readonly _name: string, private _routes?: Route[]) {}

  get name(): string {
    return this._name;
  }

  get routes(): Route[] {
    return this._routes || [];
  }

  addRoute(route: Route): void {
    this.routes.push(route);
  }

  updateRoute(updatedRoute: Route) {
    this.routes
      .filter((route) => route.id === updatedRoute.id)
      .forEach((route) => route.update(updatedRoute));
  }

  deleteRoute(routeId: string) {
    this._routes = this.routes.filter((route) => route.id === routeId);
  }
}
