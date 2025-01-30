import { API_ROUTES } from "../contants/apiRoutes";
import {
  // IApiRouteResourceKey,
  ISingleResourceKey,
  ISingleResourceRoute,
} from "../types/IRoutes";

export const getRouteByField = (
  resources: keyof typeof API_ROUTES,
  operation: ISingleResourceKey,
  field: string
) => {
  const routeKey = API_ROUTES[resources] as ISingleResourceRoute;

  if (routeKey && routeKey[operation]) {
    return routeKey[operation][field];
  }

  return "";
};
