import { Path } from "./path";
import { v4 as uuid } from "uuid";

export class Collection {
  constructor(
    private readonly _id = uuid(),
    private readonly _name: string,
    private readonly _basePath: string,
    private _paths: Path[] | undefined = []
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get basePath(): string {
    return this._basePath;
  }

  get paths(): Path[] {
    return this._paths || [];
  }

  addPath(path: Path): void {
    this.paths.push(path);
  }

  updatePath(updatedPath: Path) {
    const index = this.paths.findIndex((path) => path.id === updatedPath.id);
    if (index >= 0) this.paths[index] = updatedPath;
  }

  removePath(pathId: string) {
    this._paths = this.paths.filter((path) => path.id !== pathId);
  }
}
