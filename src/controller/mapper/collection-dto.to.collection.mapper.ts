import { CollectionDto } from "../model/collection.dto";
import { Collection } from "../../domain/model/collection";
import * as pathMapper from "./path-dto.to.path.mapper";

export function map(collectionDto: CollectionDto): Collection {
  return new Collection(
    collectionDto.id,
    collectionDto.name,
    collectionDto.paths?.map(pathMapper.map)
  );
}

export function reverseMap(collection: Collection): CollectionDto {
  return {
    id: collection.id,
    name: collection.name,
    paths: collection.paths.map((path) => pathMapper.reverseMap(path)),
  };
}
