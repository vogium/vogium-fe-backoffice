//Todo buradaki title değerleri uydurma..

export enum ReportDescription {
  ABUSE = 0,
  SPAM = 1,
}

export enum ReportDescriptionLabel {
  ABUSE = "enums.reportDescriptions.abuse",
  SPAM = "enums.reportDescriptions.spam",
}

// Optional: Helper function to get label
export const getReportDescriptionLabel = (type: ReportDescription): string => {
  return ReportDescriptionLabel[
    ReportDescription[type] as keyof typeof ReportDescriptionLabel
  ];
};

export const getReportDescriptionOptions = (): {
  value: number;
  label: string;
  style: string;
}[] => {
  return [
    {
      value: ReportDescription.ABUSE,
      label: getReportDescriptionLabel(ReportDescription.ABUSE),
      style: "text-red-500",
    },
    {
      value: ReportDescription.SPAM,
      label: getReportDescriptionLabel(ReportDescription.SPAM),
      style: "text-green-500",
    },
  ];
};

export const getReportDescriptionOption = (value: ReportDescription) => {
  return getReportDescriptionOptions().find((option) => option.value === value);
};
