export enum ReportStatus {
  PENDING = 0,
  IN_REVIEW = 1,
  RESOLVED = 2,
}

export enum ReportStatusLabel {
  PENDING = "Pending",
  IN_REVIEW = "In Review",
  RESOLVED = "Resolved",
}

export const getReportStatusLabel = (status: ReportStatus): string => {
  return ReportStatusLabel[
    ReportStatus[status] as keyof typeof ReportStatusLabel
  ];
};

// Usage example:
// const status = ReportStatus.PENDING; // value will be 0
// const label = getReportStatusLabel(status); // returns "Pending"
