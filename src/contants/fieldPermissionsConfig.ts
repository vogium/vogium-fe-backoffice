import { AccountTypes } from "../enums/user/account-type.enum";
import { FieldPermissions } from "../types/IPermission";
import { userFieldsConfig } from "./fieldConstants/userFieldsConfig";

export const fieldPermissionsConfig: FieldPermissions = {
  users: userFieldsConfig,
  vogs: [],
};
