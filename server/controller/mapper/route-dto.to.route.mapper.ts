import { MockDto, ProxyDto, RouteDto } from "../model/route.dto";
import { Route } from "../../domain/model/route";
import { ProxyRoute } from "../../domain/model/proxy.route";
import { MockRoute } from "../../domain/model/mock.route";

export function map(route: RouteDto): Route {
  switch (route.type) {
    case "mock":
      return mapMock(route as MockDto);
    case "proxy":
      return mapProxy(route as ProxyDto);
  }
}

function mapMock(route: MockDto) {
  return new MockRoute(
    route.id,
    route.collection,
    route.path,
    route.method,
    route.responseBody,
    route.contentType,
    route.encoded
  );
}

function mapProxy(route: ProxyDto) {
  return new ProxyRoute(
    route.id,
    route.collection,
    route.path,
    route.method,
    route.target
  );
}

export function reverseMap(route: Route): RouteDto {
  switch (route.constructor.name) {
    case ProxyRoute.name:
      return reverseMapProxy(route as ProxyRoute);
    case MockRoute.name:
      return reverseMapMock(route as MockRoute);
    default:
      throw new Error("invalid route type");
  }
}

function reverseMapProxy(route: ProxyRoute): ProxyDto {
  return {
    id: route.id,
    type: "proxy",
    collection: route.collection,
    target: route.target,
    method: route.method,
    path: route.path,
  };
}

function reverseMapMock(route: MockRoute): MockDto {
  return {
    collection: route.collection,
    contentType: route.contentType,
    encoded: route.encoded,
    id: route.id,
    method: route.method,
    path: route.path,
    responseBody: route.responseBody,
    type: "mock",
  };
}
