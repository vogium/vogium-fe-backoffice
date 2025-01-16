//todo product ve event tipi de gelecek sanırım..

export enum ReportType {
  VOG = 0,
  USER = 1,
  COMMENT = 2,
}

export enum ReportTypeLabel {
  VOG = "vog",
  USER = "user",
  COMMENT = "comment",
}

// Optional: Helper function to get label
export const getReportTypeLabel = (type: ReportType): string => {
  return ReportTypeLabel[ReportType[type] as keyof typeof ReportTypeLabel];
};

// Usage example:
// const reportType = ReportType.VOG; // value will be 0
// const label = getReportTypeLabel(reportType); // returns "Vog"
