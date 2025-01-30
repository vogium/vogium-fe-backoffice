export enum OfferStatus {
  ACTIVE = 0,
  PENDING = 1,
  COMPLETED = 2,
}

export enum OfferStatusLabel {
  ACTIVE = "enums.offerStatuses.active",
  PENDING = "enums.offerStatuses.pending",
  COMPLETED = "enums.offerStatuses.completed",
}

export const getOfferStatusOptions = (): {
  value: number;
  label: string;
  style: string;
}[] => {
  return [
    {
      value: OfferStatus.ACTIVE,
      label: OfferStatusLabel.ACTIVE,
      style: "text-green-400 bg-green-100 text-center p-1 rounded-lg",
    },
    {
      value: OfferStatus.PENDING,
      label: OfferStatusLabel.PENDING,
      style: "text-yellow-400 bg-yellow-100 text-center p-1 rounded-lg",
    },
    {
      value: OfferStatus.COMPLETED,
      label: OfferStatusLabel.COMPLETED,
      style: "text-red-400 bg-red-100 text-center p-1 rounded-lg",
    },
  ];
};

export const getOfferStatusOption = (value: OfferStatus) => {
  return getOfferStatusOptions().find((option) => option.value === value);
};
