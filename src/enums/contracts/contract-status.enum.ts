//Aktif, Süre Bitti, İmzalanıyor vb.
export enum ContractStatus {
  ACTIVE = 0,
  EXPIRED = 1,
  PENDING = 2,
}

export const ContractStatusLabels = {
  [ContractStatus.ACTIVE]: "enums.contractStatuses.active",
  [ContractStatus.EXPIRED]: "enums.contractStatuses.expired",
  [ContractStatus.PENDING]: "enums.contractStatuses.pending",
};

export const getContractStatusOptions = () => {
  return [
    {
      label: ContractStatusLabels[ContractStatus.ACTIVE],
      value: ContractStatus.ACTIVE,
      color: "text-blue-500",
    },
    {
      label: ContractStatusLabels[ContractStatus.EXPIRED],
      value: ContractStatus.EXPIRED,
      color: "text-red-500",
    },
    {
      label: ContractStatusLabels[ContractStatus.PENDING],
      value: ContractStatus.PENDING,
      color: "text-yellow-500",
    },
  ];
};

export const getContractStatusOption = (value: ContractStatus) => {
  return getContractStatusOptions().find((option) => option.value === value);
};
