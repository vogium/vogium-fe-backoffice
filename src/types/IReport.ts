import { ReportType } from "../enums/report/report-types.enum";
import { ReportStatus } from "../enums/report/report-status.enum";
import { ReportTitle } from "../enums/report/report-title.enum";
import { ReportDescription } from "../enums/report/report-description.enum";

export interface IReport {
  id: string;
  reporterId: string;
  reportedId: string;
  type: ReportType;
  reportTitle: ReportTitle;
  reportDescription: ReportDescription;
  reportNote: string;
  date: string;
  reportStatus: ReportStatus; //ReportStatus enum
}
