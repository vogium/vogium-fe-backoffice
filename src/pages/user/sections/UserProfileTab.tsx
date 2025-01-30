import {
  useGetIdentity,
  useNotification,
  useTranslate,
  useUpdate,
} from "@refinedev/core";
import DynamicFormWithGroups from "../../../components/form/DynamicFormWithGroups";
import { IGroup } from "../../../types/IFormTabs";
import React from "react";
import { useCommonStates } from "../../../hooks/useCommonStates";
import { IUser } from "../../../types/IUser";
import {
  AccountTypeOptions,
  AccountTypes,
  getAccountTypeOption,
} from "../../../enums/user/account-type.enum";
import {
  getUserStatusOption,
  UserStatusOptions,
} from "../../../enums/user/user-status.enum";
import {
  getUserSexOption,
  UserSexOptions,
} from "../../../enums/user/user-sex.enum";
import userUpdateSchema from "../../../schemas/user/user-update.schema";
import { NotificationsType } from "../../../enums/notifications/notifications-type.enum";
import { RESOURCES_CONSTANTS } from "../../../contants/resourceConstants";
import { IIdentity } from "../../../types/IIdentity";
import { useFieldPermissions } from "../../../hooks/useFieldPermission";
import { API_ROUTES } from "../../../contants/apiRoutes";
import { getRouteByField } from "../../../lib/routeByField";
import {
  getUserTypeOption,
  UserTypeOptions,
} from "../../../enums/user/user-type.enum";

export default function UserProfileTab({ userData }: { userData: IUser }) {
  const translate = useTranslate();
  const { open } = useNotification();
  const { isFieldEditable } = useFieldPermissions();
  const { data: identity } = useGetIdentity<IIdentity>();

  const {
    values,
    originalValues,
    validationMessages,
    setOriginalData,
    validateForm,
    handleFieldChange,
    dirtyValues,
    loadingState,
    setLoadingState,
  } = useCommonStates<IUser>();

  //Checks if the given field is editable for current user
  const checkFieldEditable = React.useCallback(
    (fieldName: string) => {
      return isFieldEditable(
        RESOURCES_CONSTANTS.USER.NAME,
        fieldName,
        identity?.accountType || AccountTypes.USER
      );
    },
    [isFieldEditable, identity?.accountType]
  );

  const formGroups: IGroup[] = React.useMemo(
    () => [
      {
        label: translate("resources.users.groups.basicInformation"),
        isLabelVisible: true,
        fields: [
          {
            id: "username",
            label: translate("resources.users.fields.username"),
            type: "text",
            colSpan: 6,
            editable: checkFieldEditable("username"),
            defaultValue: originalValues?.username,
            placeholder: originalValues?.username,
            validationMessage: validationMessages?.username,
          },
          {
            id: "realname",
            label: translate("resources.users.fields.realname"),
            type: "text",
            editable: checkFieldEditable("realname"),
            colSpan: 6,
            defaultValue: originalValues?.realname,
            placeholder: originalValues?.realname,
            validationMessage: validationMessages?.realname,
          },
          {
            id: "emailAddress",
            label: translate("resources.users.fields.emailAddress"),
            type: "email",
            editable: checkFieldEditable("emailAddress"),
            colSpan: 6,
            defaultValue: originalValues?.emailAddress,
            placeholder: originalValues?.emailAddress,
            validationMessage: validationMessages?.emailAddress,
          },
          {
            id: "phoneNumber",
            label: translate("resources.users.fields.phoneNumber"),
            type: "phone",
            editable: checkFieldEditable("phoneNumber"),
            colSpan: 6,
            defaultValue: originalValues?.phoneNumber,
            placeholder: originalValues?.phoneNumber,
            validationMessage: validationMessages?.phoneNumber,
          },
          {
            id: "sex",
            label: translate("resources.users.fields.sex"),
            type: "select",
            editable: checkFieldEditable("sex"),
            isClearable: false,
            colSpan: 6,
            options: UserSexOptions(),
            defaultValue: translate(
              getUserSexOption(originalValues?.sex)?.label || ""
            ),
            placeholder: translate(
              getUserSexOption(originalValues?.sex)?.label || ""
            ),
            validationMessage: validationMessages?.sex,
          },
          {
            id: "birthDate",
            label: translate("resources.users.fields.birthDate"),
            type: "datePicker",
            editable: checkFieldEditable("birthDate"),
            colSpan: 6,
            defaultValue: originalValues?.birthDate,
            placeholder: originalValues?.birthDate,
            validationMessage: validationMessages?.birthDate,
            maxDate: new Date(2003, 0, 1),
          },
          {
            id: "country",
            label: translate("resources.users.fields.country"),
            type: "select",
            options: [
              { value: "1", label: "Turkey" },
              { value: "2", label: "Germany" },
            ],
            editable: checkFieldEditable("country"),
            colSpan: 6,
            defaultValue: originalValues?.country,
            placeholder: originalValues?.country,
            validationMessage: validationMessages?.country,
          },
          {
            id: "city",
            label: translate("resources.users.fields.city"),
            type: "select",
            options: [
              { value: "1", label: "Adana" },
              { value: "2", label: "Adıyaman" },
            ],
            editable: checkFieldEditable("city"),
            colSpan: 6,
            defaultValue: originalValues?.city,
            placeholder: originalValues?.city,
            validationMessage: validationMessages?.city,
          },
        ],
      },
      {
        label: translate("resources.users.groups.accountStatusAndType"),
        isLabelVisible: true,
        fields: [
          {
            id: "accountType",
            label: translate("resources.users.fields.accountType"),
            type: "select",
            colSpan: 6,
            editable: checkFieldEditable("accountType"),
            isClearable: false,
            options: AccountTypeOptions(),
            defaultValue: getAccountTypeOption(originalValues?.accountType)
              ?.value,
            placeholder: originalValues?.accountType,
            validationMessage: validationMessages?.accountType,
          },
          {
            id: "userStatus",
            label: translate("resources.users.fields.userStatus"),
            type: "select",
            colSpan: 6,
            editable: checkFieldEditable("userStatus"),
            isClearable: false,
            options: UserStatusOptions(),
            defaultValue: getUserStatusOption(originalValues?.userStatus)
              ?.value,
            placeholder: originalValues?.userStatus,
            validationMessage: validationMessages?.userStatus,
          },
          {
            id: "userType",
            label: translate("resources.users.fields.userType"),
            type: "select",
            colSpan: 6,
            editable: checkFieldEditable("userType"),
            isClearable: false,
            options: UserTypeOptions(),
            defaultValue: getUserTypeOption(originalValues?.userType)?.value,
            placeholder: originalValues?.userType,
            validationMessage: validationMessages?.userType,
          },
          {
            id: "isBanned",
            label: translate("resources.users.fields.isBanned"),
            type: "checkbox",
            colSpan: 6,
            editable: checkFieldEditable("isBanned"),
            defaultValue: originalValues?.isBanned,
            placeholder: originalValues?.isBanned,
            validationMessage: validationMessages?.isBanned,
          },
          {
            id: "banDate",
            label: translate("resources.users.fields.banDate"),
            type: "datePicker",
            colSpan: 6,
            editable: false,
            defaultValue: originalValues?.banDate,
            placeholder: originalValues?.banDate,
            validationMessage: validationMessages?.banDate,
          },
          {
            id: "expireBanDate",
            label: translate("resources.users.fields.expireBanDate"),
            type: "datePicker",
            colSpan: 6,
            editable: checkFieldEditable("expireBanDate"),
            defaultValue: originalValues?.expireBanDate,
            placeholder: originalValues?.expireBanDate,
            validationMessage: validationMessages?.expireBanDate,
          },
          {
            id: "isAccountVerified",
            label: translate("resources.users.fields.isAccountVerified"),
            type: "checkbox",
            colSpan: 6,
            editable: checkFieldEditable("isAccountVerified"),
            defaultValue: originalValues?.isAccountVerified,
            placeholder: originalValues?.isAccountVerified,
            validationMessage: validationMessages?.isAccountVerified,
          },
          {
            id: "isEmailVerified",
            label: translate("resources.users.fields.isEmailVerified"),
            type: "checkbox",
            colSpan: 6,
            editable: checkFieldEditable("isEmailVerified"),
            defaultValue: originalValues?.isEmailVerified,
            placeholder: originalValues?.isEmailVerified,
            validationMessage: validationMessages?.isEmailVerified,
          },
          {
            id: "isPhoneVerified",
            label: translate("resources.users.fields.isPhoneVerified"),
            type: "checkbox",
            colSpan: 6,
            editable: checkFieldEditable("isPhoneVerified"),
            defaultValue: originalValues?.isPhoneVerified,
            placeholder: originalValues?.isPhoneVerified,
            validationMessage: validationMessages?.isPhoneVerified,
          },
        ],
      },
      {
        label: translate(
          "resources.users.groups.socialAndStatisticalInformation"
        ),
        isLabelVisible: true,
        fields: [
          {
            id: "followerCount",
            label: translate("resources.users.fields.followerCount"),
            type: "number",
            colSpan: 6,
            editable: checkFieldEditable("followerCount"),
            defaultValue: originalValues?.followerCount,
            placeholder: originalValues?.followerCount,
            validationMessage: validationMessages?.followerCount,
          },
          {
            id: "followingCount",
            label: translate("resources.users.fields.followingCount"),
            type: "number",
            colSpan: 6,
            editable: checkFieldEditable("followingCount"),
            defaultValue: originalValues?.followingCount,
            placeholder: originalValues?.followingCount,
            validationMessage: validationMessages?.followingCount,
          },
          {
            id: "subscriberCount",
            label: translate("resources.users.fields.subscriberCount"),
            type: "number",
            colSpan: 6,
            editable: checkFieldEditable("subscriberCount"),
            defaultValue: originalValues?.subscriberCount,
            placeholder: originalValues?.subscriberCount,
            validationMessage: validationMessages?.subscriberCount,
          },
          {
            id: "subscriptionCount",
            label: translate("resources.users.fields.subscriptionCount"),
            type: "number",
            colSpan: 6,
            editable: checkFieldEditable("subscriptionCount"),
            defaultValue: originalValues?.subscriptionCount,
            placeholder: originalValues?.subscriptionCount,
            validationMessage: validationMessages?.subscriptionCount,
          },
          {
            id: "totalExpenditure",
            label: translate("resources.users.fields.totalExpenditure"),
            type: "number",
            colSpan: 6,
            editable: checkFieldEditable("totalExpenditure"),
            defaultValue: originalValues?.totalExpenditure,
            placeholder: originalValues?.totalExpenditure,
            validationMessage: validationMessages?.totalExpenditure,
          },
          {
            id: "lastLoginDate",
            label: translate("resources.users.fields.lastLoginDate"),
            type: "datePicker",
            colSpan: 6,
            editable: false,
            defaultValue: originalValues?.lastLoginDate,
            placeholder: originalValues?.lastLoginDate,
            validationMessage: validationMessages?.lastLoginDate,
          },
          {
            id: "lastLogoutDate",
            label: translate("resources.users.fields.lastLogoutDate"),
            type: "datePicker",
            colSpan: 6,
            editable: false,
            defaultValue: originalValues?.lastLogoutDate,
            placeholder: originalValues?.lastLogoutDate,
            validationMessage: validationMessages?.lastLogoutDate,
          },
        ],
      },
      {
        label: translate("resources.users.groups.accountInteractions"),
        isLabelVisible: true,
        fields: [
          {
            id: "vogCount",
            label: translate("resources.users.fields.vogCount"),
            type: "number",
            colSpan: 6,
            editable: checkFieldEditable("vogCount"),
            defaultValue: originalValues?.vogCount,
            placeholder: originalValues?.vogCount,
            validationMessage: validationMessages?.vogCount,
          },
          {
            id: "vogLikeCount",
            label: translate("resources.users.fields.vogLikeCount"),
            type: "number",
            colSpan: 6,
            editable: checkFieldEditable("vogLikeCount"),
            defaultValue: originalValues?.vogLikeCount,
            placeholder: originalValues?.vogLikeCount,
            validationMessage: validationMessages?.vogLikeCount,
          },
          {
            id: "postCommentCount",
            label: translate("resources.users.fields.postCommentCount"),
            type: "number",
            colSpan: 6,
            editable: checkFieldEditable("postCommentCount"),
            defaultValue: originalValues?.postCommentCount,
            placeholder: originalValues?.postCommentCount,
            validationMessage: validationMessages?.postCommentCount,
          },
          {
            id: "favoriteBusinessCount",
            label: translate("resources.users.fields.favoriteBusinessCount"),
            type: "number",
            colSpan: 6,
            editable: checkFieldEditable("favoriteBusinessCount"),
            defaultValue: originalValues?.favoriteBusinessCount,
            placeholder: originalValues?.favoriteBusinessCount,
            validationMessage: validationMessages?.favoriteBusinessCount,
          },
          {
            id: "blogsReadCount",
            label: translate("resources.users.fields.blogsReadCount"),
            type: "number",
            colSpan: 6,
            editable: checkFieldEditable("blogsReadCount"),
            defaultValue: originalValues?.blogsReadCount,
            placeholder: originalValues?.blogsReadCount,
            validationMessage: validationMessages?.blogsReadCount,
          },
          {
            id: "blogsLikeCount",
            label: translate("resources.users.fields.blogsLikeCount"),
            type: "number",
            colSpan: 6,
            editable: checkFieldEditable("blogsLikeCount"),
            defaultValue: originalValues?.blogsLikeCount,
            placeholder: originalValues?.blogsLikeCount,
            validationMessage: validationMessages?.blogsLikeCount,
          },
        ],
      },
    ],
    [checkFieldEditable, originalValues, translate, validationMessages]
  );

  React.useEffect(() => {
    setOriginalData(userData);
  }, [userData, setOriginalData]);

  const { mutate } = useUpdate({
    resource: API_ROUTES.GATEWAY as string,
    // id is required field so that it is empty string
    id: "",
    mutationOptions: {
      onSuccess: () => {
        open?.({
          message: translate("notifications.generalSuccess", {
            resource: translate("resources.users.name"),
            action: translate("actions.updated"),
          }),
          type: NotificationsType.SUCCESS,
        });
      },
      onError: () => {
        open?.({
          message: translate("notifications.error"),
          type: NotificationsType.ERROR,
        });
      },
    },
  });

  /**
   * Handles the user profile update process.
   *
   * This method:
   * 1. Validates form data against userUpdateSchema
   * 2. If validation passes, creates API requests for each changed field
   * 3. Sends requests in parallel using Promise.all
   * 4. Manages loading state during the process
   */
  const handleUpdate = async () => {
    setLoadingState(true);

    const validation = validateForm({
      body: dirtyValues,
      schema: userUpdateSchema,
      errorCallBack: () => {
        open?.({
          message: translate("notifications.validationError"),
          type: NotificationsType.WARNING,
        });
        setLoadingState(false);
      },
    });

    if (validation.isValid && dirtyValues && Object.keys(dirtyValues).length) {
      const promises = Object.keys(dirtyValues).map(async (key) => {
        const API_ROUTE_KEY = getRouteByField("USERS", "UPDATE", key);

        if (!API_ROUTE_KEY) {
          console.error("API_ROUTE_KEY is not found for key: ", key);
          return;
        }

        return mutate({
          values: {
            serviceKey: API_ROUTE_KEY,
            data: {
              [key]: dirtyValues[key],
            },
          },
        });
      });

      await Promise.all(promises);

      setLoadingState(false);
    }
  };

  return (
    <DynamicFormWithGroups
      groups={formGroups}
      formData={values}
      onSubmit={handleUpdate}
      handleFieldChange={handleFieldChange}
      showButtonProgress={loadingState}
      isButtonBlocked={loadingState}
      className="p-4"
    />
  );
}
