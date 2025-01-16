import { ReportType } from "../enums/ReportEnums";
import { ReportStatus } from "../enums/ReportStatusEnum";

export interface IReport {
  id: string;
  reporterId: string;
  reportedId: string;
  type: ReportType;
  //Todo reportDescription && reportTitle türünde bir enum oluşturulacak...
  reportTitle: number;
  reportDescription: number;
  reportNote: string;
  date: string;
  reportStatus: ReportStatus; //ReportStatus enum

  //   String? id;
  //   String? reporterId;
  //   String? reportedId;
  //   ReportType? type;
  //   int? reportTitle;
  //   int? reportDescription;
  //   String? reportNote;
  //   DateTime? date;
  //   int? reportStatus;
}
