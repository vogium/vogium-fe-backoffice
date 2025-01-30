import { useTranslate } from "@refinedev/core";
import { Table } from "../../../components/table/Table";
import { IReport } from "../../../types/IReport";
import { IColumn } from "../../../types/ITable";
import {
  getReportTypeOption,
  ReportType,
} from "../../../enums/report/report-types.enum";
import {
  getReportStatusOption,
  ReportStatus,
} from "../../../enums/report/report-status.enum";
import TableShowButton from "../../../components/table/TableShowButton";
import TableDeleteButton from "../../../components/table/TableDeleteButton";
import paginationLibrary from "../../../hooks/usePagination";
import dummyComplaints from "../../../data/dummyComplaints.json";
import { useCommonStates } from "../../../hooks/useCommonStates";
import {
  getReportTitleOption,
  ReportTitle,
} from "../../../enums/report/report-title.enum";
import {
  getReportDescriptionOption,
  ReportDescription,
} from "../../../enums/report/report-description.enum";
import UserComplaintTabView from "./UserComplaintTabView";

export default function UserComplaintsTab() {
  const translate = useTranslate();
  const { isDetailsModalOpen, setIsDetailsModalOpen, values, setValues } =
    useCommonStates<IReport>();

  const paginationInstanceReport = paginationLibrary<IReport>();

  const reportColumns: IColumn<IReport>[] = [
    {
      key: "id",
      header: translate("resources.complaints.fields.id"),
    },
    {
      key: "type",
      header: translate("resources.complaints.fields.type"),
      render: (_, value) => {
        const reportTypeOption = getReportTypeOption(value.type as ReportType);
        return translate(reportTypeOption?.label || "");
      },
    },
    {
      key: "reportTitle",
      header: translate("resources.complaints.fields.reportTitle"),
      render: (_, value) => {
        const reportTitleOption = getReportTitleOption(
          value.reportTitle as ReportTitle
        );
        return translate(reportTitleOption?.label || "");
      },
    },
    {
      key: "reportDescription",
      header: translate("resources.complaints.fields.reportDescription"),
      render: (_, value) => {
        const reportDescriptionOption = getReportDescriptionOption(
          value.reportDescription as ReportDescription
        );
        return translate(reportDescriptionOption?.label || "");
      },
    },
    {
      key: "reportNote",
      header: translate("resources.complaints.fields.reportNote"),
    },
    {
      key: "date",
      header: translate("resources.complaints.fields.date"),
      render: (field) => {
        return <div className="w-fit">{field}</div>;
      },
    },
    {
      key: "reportStatus",
      header: translate("resources.complaints.fields.reportStatus"),
      render: (_, value) => {
        const reportStatusOption = getReportStatusOption(
          value.reportStatus as ReportStatus
        );
        return (
          <div className={reportStatusOption?.style}>
            {translate(reportStatusOption?.label || "")}
          </div>
        );
      },
    },
    {
      key: "actions",
      header: translate("table.actions"),
      render: (_, row) => (
        <span className="flex justify-center items-center gap-3">
          <TableShowButton
            onClick={() => {
              console.log("show row", row);
              setValues(row);
              setIsDetailsModalOpen(true);
            }}
          />
          <TableDeleteButton
            onClick={() => {
              console.log("delete row", row);
              // setClickedRow(row);
              // setIsWarningModalOpen(true);
            }}
          />
        </span>
      ),
    },
  ];

  if (isDetailsModalOpen && values) {
    return (
      <UserComplaintTabView
        complaint={values}
        setIsDetailsModalOpen={setIsDetailsModalOpen}
      />
    );
  }

  return (
    <>
      <Table<IReport>
        columns={reportColumns}
        rows={dummyComplaints as IReport[]}
        paginationInstance={paginationInstanceReport}
        isSearchable={true}
      />
    </>
  );
}
