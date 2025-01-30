import { ISingleResourceRoute } from "../../types/IRoutes";

export const OFFER_ROUTES: ISingleResourceRoute = {
  GET: {
    BY_OFFER_ID: "offer/find/byAuthId",
  },
  UPDATE: {
    offerTitle: "offer/update/title",
    offerDescription: "offer/update/description",
    offerDocument: "offer/update/document",
    offerPrice: "offer/update/price",
    offerStatus: "offer/update/status",
  },
  DELETE: {
    BY_OFFER_ID: "user/find/byAuthId",
  },
  CREATE: {},
};
