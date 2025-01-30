import { useTranslate } from "@refinedev/core";

export enum AccountStatus {
  USER = 0,
  VOGGER = 1,
  BUSINESS = 2,
}

export const AccountStatusLabels = {
  [AccountStatus.USER]: "user",
  [AccountStatus.VOGGER]: "vogger",
  [AccountStatus.BUSINESS]: "business",
};

export const AccountStatusOptions = () => {
  return [
    {
      label: AccountStatusLabels[AccountStatus.USER],
      value: AccountStatus.USER,
      color: "text-blue-500",
    },
    {
      label: AccountStatusLabels[AccountStatus.VOGGER],
      value: AccountStatus.VOGGER,
      color: "text-green-500",
    },
    {
      label: AccountStatusLabels[AccountStatus.BUSINESS],
      value: AccountStatus.BUSINESS,
      color: "text-red-500",
    },
  ];
};

export const getAccountStatusOption = (value: AccountStatus) => {
  return AccountStatusOptions().find((option) => option.value === value);
};
