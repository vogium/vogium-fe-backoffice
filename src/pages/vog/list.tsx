import { Table } from "../../components/table/Table";
import { IColumn } from "../../types/ITable";
import TableShowButton from "../../components/table/TableShowButton";
import TableDeleteButton from "../../components/table/TableDeleteButton";
import {
  BaseRecord,
  GetListResponse,
  useList,
  useNavigation,
  useNotification,
  useTranslate,
} from "@refinedev/core";
import PageSpinner from "../../components/spinner/PageSpinner";
import paginationLibrary from "../../lib/paginationLibrary";
import usePaginationResponse from "../../hooks/usePaginationResponse";
import { IResponsePaginatedList } from "../../types/IResponse";
import { useGenericState } from "../../hooks/useGenericState";
import WarningModal from "../../components/modals/WarningModal";
import SuccessButton from "../../components/buttons/SuccessButton";
import { IPaginationLibrary } from "../../types/IPagination";
import { IVog } from "../../types/IVog";

export const VogList = () => {
  const translate = useTranslate();
  const { show, create } = useNavigation();
  const { open } = useNotification();

  const paginationInstance = paginationLibrary<IVog>();

  const {
    isWarningModalOpen,
    setIsWarningModalOpen,
    clickedRow,
    setClickedRow,
  } = useGenericState<IVog>();

  const columns: IColumn<IVog>[] = [
    {
      key: "id", 
      header: "Vog Id",
    },
    {
      key: "authorId", //todo author id ile birlikte bff te username dönülmeli.
      header: "Author",
    },
    {
      key: "description",
      header: "Description",
    },
    {
      key: "medias",
      header: "Medias",
    },
    {
      key: "likeCount",
      header: "Likes",
    },
    {
      key: "commentCount",
      header: "Comments",
    },
    {
      key: "vogStyles",
      header: "Styles",
    },
    {
      key: "concepts",
      header: "Concepts",
    },
    {
      key: "sex",
      header: "Sex",
    },
    {
      key: "subsPermission",
      header: "Permission",
    },
    {
      key: "isSponsored",
      header: "Is Sponsored",
    },
    {
      key: "hashtags",
      header: "Hashtags",
    },
    {
      key: "vogProducts",
      header: "Products",
    },
    {
      key: "isDeleted",
      header: "Is Deleted",
    },
    {
      key: "actions",
      header: translate("table.actions"),
      render: (_, row) => (
        <span className="flex justify-center items-center gap-3">
          <TableShowButton
            onClick={() => {
              show("vogs", row.id);
            }}
          />
          <TableDeleteButton
            onClick={() => {
              setClickedRow(row);
              setIsWarningModalOpen(true);
            }}
          />
        </span>
      ),
    },
  ];

  const {
    data: response,
    isLoading,
    isError,
  } = useList<IResponsePaginatedList<IVog>>({
    resource:  "vog/find/all",
    pagination: {
      current: paginationInstance.currentPage,
      pageSize: paginationInstance.pageSize,
    },

    queryOptions: {
      // enabled: true,
      onSuccess: () => {
        paginationInstance.setIsPaginationLoading(false);
      },
      onError: () => {
        open?.({
          message: `Something went wrong while fetching the data.`,
          description: "Error",
          type: "error",
        });
        paginationInstance.setIsPaginationLoading(false);
      },
    },
    hasPagination: false,
  });

  usePaginationResponse<
  IVog,
    GetListResponse<IResponsePaginatedList<IVog>> | undefined
  >(response, paginationInstance);
  return (
    <div style={{ padding: "16px" }}>
      <PageSpinner isLoading={isLoading} />

      <div className="flex w-full mb-7 justify-between">
        <h2 className="font-bold text-xl">
          {translate("pages.users.list.title")}
        </h2>
      </div>

      <WarningModal
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        title="Warning"
        message={`Are you sure you want to delete? \n This action cannot be undone. NOTHING HAPPENS YET SINCE NO DELETION FOR VOG.`}
        onConfirm={() => {
          setIsWarningModalOpen(false);
        }}
        confirmText="Yes"
        cancelText="No"
      />

      <Table<IVog>
        columns={columns}
        rows={(
          response?.data as unknown as IVog[]) || []}
        paginationInstance={paginationInstance}
        isSearchable={true}
      />
    </div>
  );
};
