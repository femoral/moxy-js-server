import { MockModel, ProxyModel, RouteModel } from "../model/route.model";
import { Route } from "../../domain/model/route";
import { ProxyRoute } from "../../domain/model/proxy.route";
import { MockRoute } from "../../domain/model/mock.route";

export function map(route: Route): RouteModel {
  switch (route.constructor.name) {
    case ProxyRoute.name:
      return mapProxy(route as ProxyRoute);
    case MockRoute.name:
      return mapMock(route as MockRoute);
    default:
      throw new Error("invalid route type");
  }
}

function mapProxy(route: ProxyRoute): ProxyModel {
  return {
    type: "proxy",
    path: route.path,
    method: route.method,
    target: route.target,
  };
}

function mapMock(route: MockRoute): MockModel {
  return {
    type: "mock",
    path: route.path,
    method: route.method,
    responseBody: route.responseBody,
    contentType: route.contentType,
    encoded: route.encoded,
  };
}
