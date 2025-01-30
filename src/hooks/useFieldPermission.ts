import { AccountTypes } from "../enums/user/account-type.enum";
import { fieldPermissionsConfig } from "../contants/fieldPermissionsConfig";

interface PermissionsResponse {
  can: boolean;
  allowedFeatureList: string[];
}

export const useFieldPermissions = () => {
  const editablePermissions = (
    resource: string,
    accountType: AccountTypes
  ): PermissionsResponse => {
    if (!fieldPermissionsConfig[resource]) {
      return {
        can: false,
        allowedFeatureList: [],
      };
    }

    const fields = fieldPermissionsConfig[resource]
      .filter((f) => f.editableBy.includes(accountType))
      .map((f) => f.fieldKey);

    return {
      can: fields.length > 0,
      allowedFeatureList: fields,
    };
  };

  const isFieldEditable = (
    resource: string,
    field: string,
    accountType: AccountTypes
  ): boolean => {
    if (!fieldPermissionsConfig[resource]) {
      return false;
    }

    const fieldPermission = fieldPermissionsConfig[resource].find(
      (f) => f.fieldKey === field
    );

    if (!fieldPermission) {
      return false;
    }

    return fieldPermission.editableBy.includes(accountType);
  };

  return {
    editablePermissions,
    isFieldEditable,
  };
};
