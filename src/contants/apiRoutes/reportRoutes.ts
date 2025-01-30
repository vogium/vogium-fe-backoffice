import { ISingleResourceRoute } from "../../types/IRoutes";

export const REPORT_ROUTES: ISingleResourceRoute = {
  GET: {
    BY_ID: "reports",
    BY_REPORTER_ID: "reports",
  },
  UPDATE: {
    type: "reports",
    reportTitle: "reports",
    reportDescription: "reports",
    reportNote: "reports",
    reportStatus: "reports",
  },
  CREATE: {},
  DELETE: {},
};
