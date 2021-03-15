import { Path } from "./path";

export class Collection {
  constructor(private readonly _name: string, private _paths?: Path[]) {}

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

  deletePath(pathId: string) {
    this._paths = this.paths.filter((path) => path.id === pathId);
  }
}
