import { PathModel } from "./path.model";

export interface CollectionModel {
  name: string;
  paths: PathMap;
}

export type PathMap = { [id: string]: PathModel };
