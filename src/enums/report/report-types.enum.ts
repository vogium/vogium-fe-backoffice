export enum ReportType {
  VOG = 0,
  USER = 1,
  COMMENT = 2,
}

export enum ReportTypeLabel {
  VOG = "enums.reportTypes.vog",
  USER = "enums.reportTypes.user",
  COMMENT = "enums.reportTypes.comment",
}

// Optional: Helper function to get label
export const getReportTypeLabel = (type: ReportType): string => {
  return ReportTypeLabel[ReportType[type] as keyof typeof ReportTypeLabel];
};

export const getReportTypeOptions = (): {
  value: number;
  label: string;
}[] => {
  return [
    {
      value: ReportType.VOG,
      label: getReportTypeLabel(ReportType.VOG),
    },
    {
      value: ReportType.USER,
      label: getReportTypeLabel(ReportType.USER),
    },
    {
      value: ReportType.COMMENT,
      label: getReportTypeLabel(ReportType.COMMENT),
    },
  ];
};

export const getReportTypeOption = (value: ReportType) => {
  return getReportTypeOptions().find((option) => option.value === value);
};
