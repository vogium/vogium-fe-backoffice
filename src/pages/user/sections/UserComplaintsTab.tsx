import { useTranslate } from "@refinedev/core";
import SuccessButton from "../../../components/buttons/SuccessButton";
import SuccessModal from "../../../components/modals/SuccessModal";
import { Table } from "../../../components/table/Table";
import { IReport } from "../../../types/IReport";
import { IColumn } from "../../../types/ITable";
import { getReportTypeLabel, ReportType } from "../../../enums/ReportEnums";
import {
  getReportStatusLabel,
  ReportStatus,
} from "../../../enums/ReportStatusEnum";
import TableShowButton from "../../../components/table/TableShowButton";
import TableDeleteButton from "../../../components/table/TableDeleteButton";
import paginationLibrary from "../../../lib/paginationLibrary";
import React from "react";

export default function UserComplaintsTab() {
  const translate = useTranslate();
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
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
        return translate(
          "resources.enums.reportTypes." +
            getReportTypeLabel(value.type as ReportType)
        );
      },
    },
    {
      key: "reportTitle",
      header: translate("resources.complaints.fields.reportTitle"),
    },
    {
      key: "reportDescription",
      header: translate("resources.complaints.fields.reportDescription"),
    },
    {
      key: "reportNote",
      header: translate("resources.complaints.fields.reportNote"),
    },
    {
      key: "date",
      header: translate("resources.complaints.fields.date"),
    },
    {
      key: "reportStatus",
      header: translate("resources.complaints.fields.reportStatus"),
      render: (_, value) => {
        return translate(
          "resources.enums.reportStatus." +
            getReportStatusLabel(value.reportStatus as ReportStatus)
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
              // show("users", row.authId);
              console.log("show row", row);
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

  const handleSubmit = () => {
    console.log("clicked create in complaints tab");
    setIsCreateModalOpen(false);
  };

  return (
    <>
      <SuccessButton
        title={translate("actions.create")}
        onClickAction={(e: React.FormEvent) => {
          // console.log("clicked sabe", formData);
          console.log("clicked create in complaints tab");
          setIsCreateModalOpen(true);
          // handleSubmit(e, userUpdateSchema);
        }}
        parentClassName="w-full flex justify-end my-3"
        className="w-1/6"
      />

      <SuccessModal
        title="Başarılı"
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
        }}
        onConfirm={() => {
          handleSubmit();
        }}
        confirmText="Tamam"
        cancelText="İptal"
      >
        Butona tıklandığında bir form görüntülenir ve şu bilgiler
        doldurulabilir: Şikayet Eden: Kullanıcı adı veya ID. Şikayet Türü:
        Kullanıcı, Gönderi veya Yorum. Şikayet Edilen: Kullanıcı adı, gönderi ID
        veya yorum ID. Şikayet Açıklaması: Şikayetin kısa özeti.
        <div> input alanı</div>
      </SuccessModal>
      <Table<IReport>
        columns={reportColumns}
        rows={[]}
        paginationInstance={paginationInstanceReport}
        isSearchable={true}
      />
    </>
  );
}
