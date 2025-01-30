export enum AccountTypes {
  USER = 0,
  MODERATOR = 1,
  ADMIN = 2,
  SUPERUSER = 3,
  DEVELOPER = 4,
}

export const AccountTypeLabels = {
  [AccountTypes.USER]: "enums.accountTypes.user",
  [AccountTypes.MODERATOR]: "enums.accountTypes.moderator",
  [AccountTypes.ADMIN]: "enums.accountTypes.admin",
  [AccountTypes.SUPERUSER]: "enums.accountTypes.superuser",
  [AccountTypes.DEVELOPER]: "enums.accountTypes.developer",
};

export const AccountTypeOptions = () => {
  return [
    {
      label: AccountTypeLabels[AccountTypes.USER],
      value: AccountTypes.USER,
      color: "text-blue-500",
    },
    {
      label: AccountTypeLabels[AccountTypes.MODERATOR],
      value: AccountTypes.MODERATOR,
      color: "text-green-500",
    },
    {
      label: AccountTypeLabels[AccountTypes.ADMIN],
      value: AccountTypes.ADMIN,
      color: "text-red-500",
    },
    {
      label: AccountTypeLabels[AccountTypes.SUPERUSER],
      value: AccountTypes.SUPERUSER,
      color: "text-yellow-500",
    },
    {
      label: AccountTypeLabels[AccountTypes.DEVELOPER],
      value: AccountTypes.DEVELOPER,
      color: "text-pink-500",
    },
  ];
};

export const getAccountTypeOption = (value: AccountTypes) => {
  return AccountTypeOptions().find((option) => option.value === value);
};
