import { AccountTypes } from "../enums/user/account-type.enum";

export interface FieldPermission {
  fieldKey: string;
  editableBy: AccountTypes[];
}

export interface FieldPermissions {
  [key: string]: FieldPermission[];
}
