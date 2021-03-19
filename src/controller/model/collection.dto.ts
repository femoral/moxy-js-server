import { PathDto } from "./path.dto";

export interface CollectionDto {
  id?: string;
  name: string;
  paths?: PathDto[];
}
