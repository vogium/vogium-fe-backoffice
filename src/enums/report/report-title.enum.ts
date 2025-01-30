//Todo buradaki title değerleri uydurma..

export enum ReportTitle {
  ABUSE = 0,
  SPAM = 1,
}

export enum ReportTitleLabel {
  ABUSE = "enums.reportTitles.abuse",
  SPAM = "enums.reportTitles.spam",
}

// Optional: Helper function to get label
export const getReportTitleLabel = (type: ReportTitle): string => {
  return ReportTitleLabel[ReportTitle[type] as keyof typeof ReportTitleLabel];
};

export const getReportTitleOptions = (): {
  value: number;
  label: string;
  style: string;
}[] => {
  return [
    {
      value: ReportTitle.ABUSE,
      label: getReportTitleLabel(ReportTitle.ABUSE),
      style: "text-red-500",
    },
    {
      value: ReportTitle.SPAM,
      label: getReportTitleLabel(ReportTitle.SPAM),
      style: "text-green-500",
    },
  ];
};

export const getReportTitleOption = (value: ReportTitle) => {
  return getReportTitleOptions().find((option) => option.value === value);
};
