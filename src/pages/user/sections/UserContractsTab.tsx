import { useTranslate } from "@refinedev/core";
import { IUser } from "../../../types/IUser";
import { useCommonStates } from "../../../hooks/useCommonStates";
import paginationLibrary from "../../../hooks/usePagination";
import { IColumn } from "../../../types/ITable";
import { Table } from "../../../components/table/Table";
import TableShowButton from "../../../components/table/TableShowButton";
import SuccessButton from "../../../components/buttons/SuccessButton";
import { IContract } from "../../../types/IContract";
import {
  ContractStatus,
  getContractStatusOption,
} from "../../../enums/contracts/contract-status.enum";
import {
  ContractType,
  getContractTypeOption,
} from "../../../enums/contracts/contract-type.enum";
import UserContractTabCreate from "./UserContractTabCreate";
import UserContractTabView from "./UserContractTabView";

//todo data fetch edilecek..
export default function UserContractsTab({ userData }: { userData: IUser }) {
  const translate = useTranslate();
  const {
    isCreateModalOpen,
    setIsCreateModalOpen,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    values,
    setValues,
  } = useCommonStates<IContract>();

  const paginationInstanceReport = paginationLibrary<IContract>();

  const dummyContracts: IContract[] = [
    {
      id: "1",
      userIds: ["1"],
      startDate: "2021-09-01T00:00:00.000Z",
      endDate: "2021-09-30T00:00:00.000Z",
      status: ContractStatus.ACTIVE,
      description: "Offer 1 Description",
      documentIds: ["1"],
      type: ContractType.BRAND,
      signatures: [
        {
          id: "1",
          authorId: "1",
          type: "SignatureType",
          state: "SignatureState",
          ip: "123",
          deviceName: "DeviceName",
          deviceOS: "DeviceOS",
          date: "2021-09-01T00:00:00.000Z",
          documentIds: ["1"],
        },
      ],
      logs: [],
      date: new Date().toISOString(),
    },
  ];

  const offerColumns: IColumn<IContract>[] = [
    {
      key: "status",
      header: translate("resources.contracts.fields.status"),
      render: (_, value) => {
        return translate(getContractStatusOption(value.status)?.label || "");
      },
    },
    {
      key: "description",
      header: translate("resources.contracts.fields.description"),
    },
    {
      key: "startDate",
      header: translate("resources.contracts.fields.startDate"),
      render: (_, value) => {
        return new Date(value.startDate).toLocaleDateString();
      },
    },
    {
      key: "endDate",
      header: translate("resources.contracts.fields.endDate"),
      render: (_, value) => {
        return new Date(value.endDate).toLocaleDateString();
      },
    },
    {
      key: "type",
      header: translate("resources.contracts.fields.type"),
      render: (_, value) => {
        return translate(getContractTypeOption(value.type)?.label || "");
      },
    },

    {
      key: "actions",
      header: translate("table.actions"),
      render: (_, row) => {
        return (
          <div className="flex justify-center items-center">
            <TableShowButton
              onClick={() => {
                setValues(row);
                setIsDetailsModalOpen(true);
              }}
            />
          </div>
        );
      },
    },
  ];

  if (isDetailsModalOpen && values) {
    return (
      <UserContractTabView
        contract={values}
        setIsDetailsModalOpen={setIsDetailsModalOpen}
      ></UserContractTabView>
    );
  }

  if (isCreateModalOpen) {
    return (
      <UserContractTabCreate
        setIsCreateModalOpen={setIsCreateModalOpen}
      ></UserContractTabCreate>
    );
  }

  return (
    <>
      <SuccessButton
        title="Create||Contract"
        onClickAction={() => setIsCreateModalOpen(true)}
        parentClassName="w-full flex justify-end my-3"
        className="w-fit"
      />

      <Table<IContract>
        columns={offerColumns}
        rows={dummyContracts}
        paginationInstance={paginationInstanceReport}
        isSearchable={true}
      />
    </>
  );
}
