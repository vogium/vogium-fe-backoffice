export enum UserType {
  BASIC = 0,
  PLUS = 1,
  PRIVE = 2,
  ELITE = 3,
}

export const UserTypeLabels = {
  [UserType.BASIC]: "enums.userTypes.basic",
  [UserType.PLUS]: "enums.userTypes.plus",
  [UserType.PRIVE]: "enums.userTypes.prive",
  [UserType.ELITE]: "enums.userTypes.elite",
};

export const UserTypeOptions = () => {
  return [
    {
      label: UserTypeLabels[UserType.BASIC],
      value: UserType.BASIC,
      color: "text-blue-500",
    },
    {
      label: UserTypeLabels[UserType.PLUS],
      value: UserType.PLUS,
      color: "text-green-500",
    },
    {
      label: UserTypeLabels[UserType.PRIVE],
      value: UserType.PRIVE,
      color: "text-red-500",
    },
    {
      label: UserTypeLabels[UserType.ELITE],
      value: UserType.ELITE,
      color: "text-yellow-500",
    },
  ];
};

export const getUserTypeOption = (value: UserType) => {
  return UserTypeOptions().find((option) => option.value === value);
};
