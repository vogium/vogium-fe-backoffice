export enum UserSex {
  MALE = 0,
  FEMALE = 1,
  UNKNOWN = 2,
}

export const UserSexLabels = {
  [UserSex.MALE]: "enums.sexes.male",
  [UserSex.FEMALE]: "enums.sexes.female",
  [UserSex.UNKNOWN]: "enums.sexes.unknown",
};

export const UserSexOptions = () => {
  return [
    {
      label: UserSexLabels[UserSex.MALE],
      value: UserSex.MALE,
      color: "text-blue-500",
    },
    {
      label: UserSexLabels[UserSex.FEMALE],
      value: UserSex.FEMALE,
      color: "text-green-500",
    },
    {
      label: UserSexLabels[UserSex.UNKNOWN],
      value: UserSex.UNKNOWN,
      color: "text-red-500",
    },
  ];
};

export const getUserSexOption = (value: UserSex) => {
  return UserSexOptions().find((option) => option.value === value);
};
