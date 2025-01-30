import { ISingleResourceRoute } from "../../types/IRoutes";

export const CONTRACT_ROUTES: ISingleResourceRoute = {
  GET: {
    BY_CONTRACT_ID: "offer/find/byAuthId",
  },
  UPDATE: {
    userIds: "contract/update/userIds",
    startDate: "contract/update/startDate",
    endDate: "contract/update/endDate",
    status: "contract/update/status",
    description: "contract/update/description",
    documentIds: "contract/update/documentIds",
    signatures: "contract/update/signatures",
    logs: "contract/update/logs",
  },
  DELETE: {
    BY_CONTRACT_ID: "user/find/byAuthId",
  },
  CREATE: {},
};
