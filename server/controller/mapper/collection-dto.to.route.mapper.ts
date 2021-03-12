import { CollectionDto } from "../model/collection.dto";
import { Collection } from "../../domain/model/collection";
import * as routeMapper from "./route-dto.to.route.mapper";

export function reverseMap(collection: Collection): CollectionDto {
  return {
    name: collection.name,
    routes: collection.routes.map((route) => routeMapper.reverseMap(route)),
  };
}
