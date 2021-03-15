import { PathDto } from "./path.dto";

export interface CollectionDto {
  name: string;
  paths?: PathDto[];
}
