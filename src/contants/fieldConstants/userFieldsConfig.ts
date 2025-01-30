import { AccountTypes } from "../../enums/user/account-type.enum";
import { FieldPermission } from "../../types/IPermission";

const basicFields: FieldPermission[] = [
  {
    fieldKey: "username",
    editableBy: [
      AccountTypes.MODERATOR,
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
  {
    fieldKey: "realname",
    editableBy: [
      AccountTypes.MODERATOR,
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
  {
    fieldKey: "emailAddress",
    editableBy: [
      AccountTypes.MODERATOR,
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
  {
    fieldKey: "phoneNumber",
    editableBy: [
      AccountTypes.MODERATOR,
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
  {
    fieldKey: "sex",
    editableBy: [
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
  {
    fieldKey: "birthDate",
    editableBy: [
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
  {
    fieldKey: "city",
    editableBy: [
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
  {
    fieldKey: "country",
    editableBy: [
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
];

const accountFields: FieldPermission[] = [
  {
    fieldKey: "accountType",
    editableBy: [
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
  {
    fieldKey: "userStatus",
    editableBy: [
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
  {
    fieldKey: "userType",
    editableBy: [
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
  {
    fieldKey: "isBanned",
    editableBy: [
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
  {
    fieldKey: "banDate",
    editableBy: [
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
  {
    fieldKey: "expireBanDate",
    editableBy: [
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },

  {
    fieldKey: "isAccountVerified",
    editableBy: [
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
  {
    fieldKey: "isEmailVerified",
    editableBy: [
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
  {
    fieldKey: "isPhoneVerified",
    editableBy: [
      AccountTypes.ADMIN,
      AccountTypes.SUPERUSER,
      AccountTypes.DEVELOPER,
    ],
  },
];

const socialAndStatisticalFields: FieldPermission[] = [
  {
    fieldKey: "followerCount",
    editableBy: [AccountTypes.SUPERUSER, AccountTypes.DEVELOPER],
  },
  {
    fieldKey: "followingCount",
    editableBy: [AccountTypes.SUPERUSER, AccountTypes.DEVELOPER],
  },
  {
    fieldKey: "subscriberCount",
    editableBy: [AccountTypes.SUPERUSER, AccountTypes.DEVELOPER],
  },
  {
    fieldKey: "subscriptionCount",
    editableBy: [AccountTypes.SUPERUSER, AccountTypes.DEVELOPER],
  },
  {
    fieldKey: "totalExpenditure",
    editableBy: [AccountTypes.SUPERUSER, AccountTypes.DEVELOPER],
  },
  {
    fieldKey: "lastLoginDate",
    editableBy: [AccountTypes.SUPERUSER, AccountTypes.DEVELOPER],
  },
  {
    fieldKey: "lastLogoutDate",
    editableBy: [AccountTypes.SUPERUSER, AccountTypes.DEVELOPER],
  },
];

const accountInteractionFields: FieldPermission[] = [
  {
    fieldKey: "vogCount",
    editableBy: [AccountTypes.SUPERUSER, AccountTypes.DEVELOPER],
  },
  {
    fieldKey: "vogLikeCount",
    editableBy: [AccountTypes.SUPERUSER, AccountTypes.DEVELOPER],
  },
  {
    fieldKey: "postCommentCount",
    editableBy: [AccountTypes.SUPERUSER, AccountTypes.DEVELOPER],
  },
  {
    fieldKey: "favoriteBusinessCount",
    editableBy: [AccountTypes.SUPERUSER, AccountTypes.DEVELOPER],
  },
  {
    fieldKey: "blogsReadCount",
    editableBy: [AccountTypes.SUPERUSER, AccountTypes.DEVELOPER],
  },
  {
    fieldKey: "blogsLikeCount",
    editableBy: [AccountTypes.SUPERUSER, AccountTypes.DEVELOPER],
  },
];

export const userFieldsConfig: FieldPermission[] = [
  ...basicFields,
  ...accountFields,
  ...socialAndStatisticalFields,
  ...accountInteractionFields,
];
