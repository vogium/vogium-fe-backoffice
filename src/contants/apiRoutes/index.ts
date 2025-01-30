// define routes here
// you need avoid using '/' at the beginning of the route. it will be added automatically
// and if you add it anyway, you probably will get an 404 error

import { ISingleResourceRoute } from "../../types/IRoutes";
import { CONTRACT_ROUTES } from "./contractRoutes";
import { OFFER_ROUTES } from "./offerRoutes";
import { REPORT_ROUTES } from "./reportRoutes";
import { USER_ROUTES } from "./userRoutes";
import { VOG_ROUTES } from "./vogRoutes";

// in update statements, defining as field name is a good practice. Since route matching is done by field name

interface IApiRoutes {
  API_INIT: string;
  GATEWAY: string;
  USERS: ISingleResourceRoute;
  VOGS: ISingleResourceRoute;
  REPORTS: ISingleResourceRoute;
  OFFERS: ISingleResourceRoute;
  CONTRACTS: ISingleResourceRoute;
}

export const API_ROUTES: IApiRoutes = {
  API_INIT: "api/init",
  GATEWAY: "api/gateway",
  USERS: USER_ROUTES,
  VOGS: VOG_ROUTES,
  REPORTS: REPORT_ROUTES,
  OFFERS: OFFER_ROUTES,
  CONTRACTS: CONTRACT_ROUTES,
};
