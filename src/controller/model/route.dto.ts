import { RouteMethod } from "../../domain/model/route";

export interface RouteDto {
  id?: string;
  collection: string;
  type: RouteType;
  path: string;
  method: RouteMethod;
}

export interface ProxyDto extends RouteDto {
  type: "proxy";
  target: string;
}

export interface MockDto extends RouteDto {
  type: "mock";
  responseBody: string;
  contentType?: string;
  encoded?: boolean;
}

type RouteType = "mock" | "proxy";
