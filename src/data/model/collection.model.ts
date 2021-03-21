import { PathModel } from "./path.model";

export interface CollectionModel {
  id: string;
  name: string;
  basePath: string;
  paths: PathMap;
}

export type PathMap = { [id: string]: PathModel };
