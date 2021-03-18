import { Path } from "./path";
import { v4 as uuid } from "uuid";

export class Collection {
  constructor(
    private readonly _id = uuid(),
    private readonly _name: string,
    private _paths: Path[] = []
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get paths(): Path[] {
    return this._paths || [];
  }

  addPath(path: Path): void {
    this.paths.push(path);
  }

  updatePath(updatedPath: Path) {
    this.paths
      .filter((path) => path.id === updatedPath.id)
      .forEach((path) => path.update(updatedPath));
  }

  removePath(pathId: string) {
    this._paths = this.paths.filter((path) => path.id !== pathId);
  }
}
