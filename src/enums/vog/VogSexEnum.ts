export enum VogSex {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    UNISEX = 'UNISEX',
  }
  
  export const VogSexLabels = {
    [VogSex.MALE]: "Male",
    [VogSex.FEMALE]: "Female",
    [VogSex.UNISEX]: "Unisex",
  };
  
  export const VogSexOptions = () => {
    return [
      {
        label: VogSexLabels[VogSex.MALE],
        value: VogSex.MALE,
        color: "text-blue-500",
      },
      {
        label: VogSexLabels[VogSex.FEMALE],
        value: VogSex.FEMALE,
        color: "text-green-500",
      },
      {
        label: VogSexLabels[VogSex.UNISEX],
        value: VogSex.UNISEX,
        color: "text-purple-500",
      },
    ];
  };

  export const getVogSexOption = (value: VogSex) => {
    return VogSexOptions().find((option) => option.value === value);
  };