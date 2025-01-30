export enum UserStatus {
  NORMAL = 0,
  VERIFIED = 1,
  VOGGER = 2,
  BUSINESS = 3,
}

export const UserStatusLabels = {
  [UserStatus.NORMAL]: "enums.userStatuses.normal",
  [UserStatus.VERIFIED]: "enums.userStatuses.verified",
  [UserStatus.VOGGER]: "enums.userStatuses.vogger",
  [UserStatus.BUSINESS]: "enums.userStatuses.business",
};

export const UserStatusOptions = () => {
  return [
    {
      label: UserStatusLabels[UserStatus.NORMAL],
      value: UserStatus.NORMAL,
      color: "text-blue-500",
    },
    {
      label: UserStatusLabels[UserStatus.VERIFIED],
      value: UserStatus.VERIFIED,
      color: "text-green-500",
    },
    {
      label: UserStatusLabels[UserStatus.VOGGER],
      value: UserStatus.VOGGER,
      color: "text-red-500",
    },
    {
      label: UserStatusLabels[UserStatus.BUSINESS],
      value: UserStatus.BUSINESS,
      color: "text-yellow-500",
    },
  ];
};

export const getUserStatusOption = (value: UserStatus) => {
  return UserStatusOptions().find((option) => option.value === value);
};
