import { CollectionDto } from "../model/collection.dto";
import { Collection } from "../../domain/model/collection";
import * as pathMapper from "./path-dto.to.path.mapper";

export function reverseMap(collection: Collection): CollectionDto {
  return {
    name: collection.name,
    paths: collection.paths.map((path) => pathMapper.reverseMap(path)),
  };
}
