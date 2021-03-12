import { RouteMethod } from "../../domain/model/route";

export interface RouteModel {
  type: RouteType;
  path: string;
  method: RouteMethod;
}

export interface ProxyModel extends RouteModel {
  type: "proxy";
  target: string;
}

export interface MockModel extends RouteModel {
  type: "mock";
  responseBody: string;
  contentType?: string;
  encoded?: boolean;
}

type RouteType = "mock" | "proxy";
