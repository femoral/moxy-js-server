import { existsSync, promises as fs } from "fs";
import { Collection } from "../domain/model/collection";
import path from "path";
import { MockModel, ProxyModel, RouteModel } from "./model/route.model";
import { CollectionModel, RouteMap } from "./model/collection.model";
import { MockRoute } from "../domain/model/mock.route";
import { ProxyRoute } from "../domain/model/proxy.route";
import { Route } from "../domain/model/route";
import * as routeMapper from "./mapper/route.to.route-model.mapper";
import { COLLECTIONS_PATH } from "../common/config";

export async function updateCollection(collection: Collection): Promise<void> {
  const model: CollectionModel = {
    name: collection.name,
    routes: collection.routes.reduce((routes: RouteMap, route: Route) => {
      routes[route.id] = routeMapper.map(route);
      return routes;
    }, {}),
  };
  await fs.writeFile(
    `${COLLECTIONS_PATH}/${collection.name}/collection.json`,
    JSON.stringify(model, undefined, 4)
  );
}

export async function createCollection(name: string): Promise<void> {
  const collectionFolder = path.join(COLLECTIONS_PATH, name);

  if (existsSync(collectionFolder)) {
    throw new Error("collection already exists");
  } else {
    await fs.mkdir(collectionFolder);
    await fs.writeFile(
      path.join(collectionFolder, "collection.json"),
      JSON.stringify({ routes: [] })
    );
  }
}

export async function getCollections(): Promise<Collection[]> {
  return Promise.all(
    (await fs.readdir(COLLECTIONS_PATH, { withFileTypes: true }))
      .filter((dirEntry) => dirEntry.isDirectory())
      .map((dirEntry) => getCollection(dirEntry.name))
  );
}

export async function getCollection(name: string): Promise<Collection> {
  const collection: CollectionModel = JSON.parse(
    await fs.readFile(`${COLLECTIONS_PATH}/${name}/collection.json`, "utf-8")
  );

  return new Collection(
    name,
    Object.keys(collection.routes).map((id) => {
      const route = collection.routes[id];
      switch (route.type) {
        case "mock":
          return mapMock(id, collection.name, route as MockModel);
        case "proxy":
          return mapProxy(id, collection.name, route as ProxyModel);
      }
    })
  );
}

function mapProxy(id: string, collectionName: string, route: ProxyModel) {
  return new ProxyRoute(
    id,
    collectionName,
    route.path,
    route.method,
    route.target
  );
}

function mapMock(id: string, collectionName: string, route: MockModel) {
  return new MockRoute(
    id,
    collectionName,
    route.path,
    route.method,
    route.responseBody,
    route.contentType,
    route.encoded
  );
}
