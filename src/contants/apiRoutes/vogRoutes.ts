import { ISingleResourceRoute } from "../../types/IRoutes";

export const VOG_ROUTES: ISingleResourceRoute = {
  GET: {
    BY_VOG_ID: "vof/find/byAuthId",
  },
  UPDATE: {
    city: "/api/vog/location",
  },
  DELETE: {
    BY_AUTH_ID: "user/find/byAuthId",
  },
  CREATE: {},
};
