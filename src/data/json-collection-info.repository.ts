import { existsSync, promises as fs } from "fs";
import { Collection } from "../domain/model/collection";
import path from "path";
import { MockModel, ProxyModel } from "./model/path.model";
import { CollectionModel, PathMap } from "./model/collection.model";
import { MockPath } from "../domain/model/mock.path";
import { ProxyPath } from "../domain/model/proxy.path";
import { Path } from "../domain/model/path";
import * as pathMapper from "./mapper/path.to.path-model.mapper";
import { COLLECTIONS_PATH } from "../common/config";
import rimraf from "rimraf";
import { promisify } from "util";

export async function updateCollection(collection: Collection): Promise<void> {
  const model: CollectionModel = {
    id: collection.id,
    name: collection.name,
    paths: collection.paths.reduce((paths: PathMap, path: Path) => {
      paths[path.id] = pathMapper.map(path);
      return paths;
    }, {}),
  };
  await fs.writeFile(
    path.join(COLLECTIONS_PATH, collection.id, "collection.json"),
    JSON.stringify(model, undefined, 4)
  );
}

export async function createCollection(collection: Collection): Promise<void> {
  const collectionFolder = path.join(COLLECTIONS_PATH, collection.id);

  if (existsSync(collectionFolder)) {
    throw new Error("collection already exists");
  } else {
    await fs.mkdir(collectionFolder);
    await fs.writeFile(
      path.join(collectionFolder, "collection.json"),
      JSON.stringify(
        { id: collection.id, name: collection.name, paths: [] },
        undefined,
        4
      )
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

export async function getCollection(id: string): Promise<Collection> {
  const collectionFilePath = path.join(COLLECTIONS_PATH, id, "collection.json");
  const collection: CollectionModel = JSON.parse(
    await fs.readFile(collectionFilePath, "utf-8")
  );

  return new Collection(
    collection.id,
    collection.name,
    Object.keys(collection.paths).map((id) => {
      const path = collection.paths[id];
      switch (path.type) {
        case "mock":
          return mapMock(id, collection.name, path as MockModel);
        case "proxy":
          return mapProxy(id, collection.name, path as ProxyModel);
      }
    })
  );
}

export async function deleteCollection(name: string): Promise<void> {
  await promisify(rimraf)(path.join(COLLECTIONS_PATH, name));
}

function mapProxy(id: string, collectionName: string, path: ProxyModel) {
  return new ProxyPath(id, collectionName, path.path, path.method, path.target);
}

function mapMock(id: string, collectionName: string, path: MockModel) {
  return new MockPath(
    id,
    collectionName,
    path.path,
    path.method,
    path.responseBody,
    path.contentType,
    path.encoded
  );
}
