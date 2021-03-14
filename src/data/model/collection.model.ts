import { RouteModel } from "./route.model";

export interface CollectionModel {
  name: string;
  routes: RouteMap;
}

export type RouteMap = { [id: string]: RouteModel };
