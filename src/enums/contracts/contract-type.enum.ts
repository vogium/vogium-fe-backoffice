export enum ContractType {
  VOGER = 0,
  USAGE = 1,
  AGENCY = 2,
  BRAND = 3,
  COLLABORATION = 4,
  SPONSORED_POST = 5,
  CAMPAIGN = 6,
}

export const ContractTypeLabels = {
  [ContractType.VOGER]: "enums.contractTypes.voger",
  [ContractType.USAGE]: "enums.contractTypes.usage",
  [ContractType.AGENCY]: "enums.contractTypes.agency",
  [ContractType.BRAND]: "enums.contractTypes.brand",
  [ContractType.COLLABORATION]: "enums.contractTypes.collaboration",
  [ContractType.SPONSORED_POST]: "enums.contractTypes.sponsoredPost",
  [ContractType.CAMPAIGN]: "enums.contracts.campaign",
};

export const getContractTypeOptions = () => {
  return [
    {
      label: ContractTypeLabels[ContractType.VOGER],
      value: ContractType.VOGER,
      color: "text-blue-500",
    },
    {
      label: ContractTypeLabels[ContractType.USAGE],
      value: ContractType.USAGE,
      color: "text-green-500",
    },
    {
      label: ContractTypeLabels[ContractType.AGENCY],
      value: ContractType.AGENCY,
      color: "text-red-500",
    },
    {
      label: ContractTypeLabels[ContractType.BRAND],
      value: ContractType.BRAND,
      color: "text-yellow-500",
    },
    {
      label: ContractTypeLabels[ContractType.COLLABORATION],
      value: ContractType.COLLABORATION,
      color: "text-purple-500",
    },
    {
      label: ContractTypeLabels[ContractType.SPONSORED_POST],
      value: ContractType.SPONSORED_POST,
      color: "text-pink-500",
    },
    {
      label: ContractTypeLabels[ContractType.CAMPAIGN],
      value: ContractType.CAMPAIGN,
      color: "text-indigo-500",
    },
  ];
};

export const getContractTypeOption = (value: ContractType) => {
  return getContractTypeOptions().find((option) => option.value === value);
};
