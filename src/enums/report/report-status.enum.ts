export enum ReportStatus {
  PENDING = 0,
  IN_REVIEW = 1,
  RESOLVED = 2,
}

export enum ReportStatusLabel {
  PENDING = "enums.reportStatuses.pending",
  IN_REVIEW = "enums.reportStatuses.inReview",
  RESOLVED = "enums.reportStatuses.resolved",
}

export const getReportStatusOptions = (): {
  value: number;
  label: string;
  style: string;
}[] => {
  return [
    {
      value: ReportStatus.PENDING,
      label: ReportStatusLabel.PENDING,
      style: "text-red-400 bg-red-100 text-center p-1 rounded-lg w-",
    },
    {
      value: ReportStatus.IN_REVIEW,
      label: ReportStatusLabel.IN_REVIEW,
      style: "text-yellow-400 bg-yellow-100 text-center p-1 rounded-lg",
    },
    {
      value: ReportStatus.RESOLVED,
      label: ReportStatusLabel.RESOLVED,
      style: "text-green-400 bg-green-100 text-center p-1 rounded-lg",
    },
  ];
};

export const getReportStatusOption = (value: ReportStatus) => {
  return getReportStatusOptions().find((option) => option.value === value);
};
