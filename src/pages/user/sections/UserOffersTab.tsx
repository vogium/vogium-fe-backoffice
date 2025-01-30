import { useTranslate } from "@refinedev/core";
import { IUser } from "../../../types/IUser";
import { useCommonStates } from "../../../hooks/useCommonStates";
import paginationLibrary from "../../../hooks/usePagination";
import { IOffer } from "../../../types/IOffer";
import { IColumn } from "../../../types/ITable";
import { Table } from "../../../components/table/Table";
import { getOfferStatusOption } from "../../../enums/offers/offers-status.enum";
import { OfferStatus } from "../../../enums/offers/offers-status.enum";
import UserOfferTabView from "./UserOfferTabView";
import TableShowButton from "../../../components/table/TableShowButton";
import SuccessButton from "../../../components/buttons/SuccessButton";
import UserOfferTabCreate from "./UserOfferTabCreate";

export default function UserOffersTab({ userData }: { userData: IUser }) {
  const translate = useTranslate();
  const {
    isCreateModalOpen,
    setIsCreateModalOpen,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    values,
    setValues,
    handleFieldChange,
  } = useCommonStates<IOffer>();

  //todo Teklifleri filtrelemek için bir dropdown menü sunulmalıdır:
  // Durum Filtreleme: Beklemede, Aktif, Tamamlandı.
  //Filtre seçildiğinde, liste yalnızca seçilen duruma uygun teklifleri gösterecek şekilde güncellenir.

  const paginationInstanceReport = paginationLibrary<IOffer>();

  const dummyOffers: IOffer[] = [
    {
      id: "1",
      title: "Offer 1",
      description: "Offer 1 Description",
      documentUrl: "pdf...",
      amount: 100,
      status: OfferStatus.ACTIVE,
      startDate: "2021-09-01T00:00:00.000Z",
      endDate: "2021-09-30T00:00:00.000Z",
    },
    {
      id: "2",
      title: "Offer 2",
      description: "Offer 2 Description",
      documentUrl: "pdf...",
      amount: 200,
      status: OfferStatus.PENDING,
      startDate: "2021-09-01T00:00:00.000Z",
      endDate: "2021-09-30T00:00:00.000Z",
    },
    {
      id: "3",
      title: "Offer 3",
      description: "Offer 3 Description",
      documentUrl: "pdf...",
      amount: 300,
      status: OfferStatus.COMPLETED,
      startDate: "2021-09-01T00:00:00.000Z",
      endDate: "2021-09-30T00:00:00.000Z",
    },
    {
      id: "4",
      title: "Offer 4",
      description: "Offer 4 Description",
      documentUrl: "pdf...",
      amount: 400,
      status: OfferStatus.PENDING,
      startDate: "2021-09-01T00:00:00.000Z",
      endDate: "2021-09-30T00:00:00.000Z",
    },
  ];

  const offerColumns: IColumn<IOffer>[] = [
    {
      key: "title",
      header: translate("resources.offers.fields.title"),
    },
    {
      key: "description",
      header: translate("resources.offers.fields.description"),
    },
    {
      key: "amount",
      header: translate("resources.offers.fields.amount"),
    },
    {
      key: "status",
      header: translate("resources.offers.fields.status"),
      render: (_, value) => {
        const offerStatusOption = getOfferStatusOption(
          value.status as OfferStatus
        );
        return translate(offerStatusOption?.label || "");
      },
    },
    {
      key: "startDate",
      header: translate("resources.offers.fields.startDate"),
      render: (_, value) => {
        return new Date(value.startDate).toLocaleDateString();
      },
    },
    {
      key: "endDate",
      header: translate("resources.offers.fields.endDate"),
      render: (_, value) => {
        return new Date(value.endDate).toLocaleDateString();
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
      <UserOfferTabView
        offer={values}
        setIsDetailsModalOpen={setIsDetailsModalOpen}
      ></UserOfferTabView>
    );
  }

  if (isCreateModalOpen) {
    return (
      <UserOfferTabCreate
        setIsCreateModalOpen={setIsCreateModalOpen}
      ></UserOfferTabCreate>
    );
  }

  return (
    <>
      <SuccessButton
        title="Create Offer"
        onClickAction={() => setIsCreateModalOpen(true)}
        parentClassName="w-full flex justify-end my-3"
        className="w-fit"
      />

      <Table<IOffer>
        columns={offerColumns}
        rows={dummyOffers}
        paginationInstance={paginationInstanceReport}
        isSearchable={true}
      />
    </>
  );
}
