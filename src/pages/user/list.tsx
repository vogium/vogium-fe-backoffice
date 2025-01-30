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
import paginationLibrary from "../../hooks/usePagination";
import usePaginationResponse from "../../hooks/usePaginationResponse";
import { IUser } from "../../types/IUser";
import { IResponsePaginatedList } from "../../types/IResponse";
import { useGenericState } from "../../hooks/useGenericState";
import WarningModal from "../../components/modals/WarningModal";
import SuccessButton from "../../components/buttons/SuccessButton";
import { IPaginationLibrary } from "../../types/IPagination";
import { API_ROUTES } from "../../contants/apiRoutes";

export const UserList = () => {
  const translate = useTranslate();
  const { show, create } = useNavigation();
  const { open } = useNotification();

  const paginationInstance = paginationLibrary<IUser>();

  const {
    isWarningModalOpen,
    setIsWarningModalOpen,
    clickedRow,
    setClickedRow,
  } = useGenericState<IUser>();

  const columns: IColumn<IUser>[] = [
    {
      key: "vogCount",
      header: "Vog Count",
    },
    {
      key: "questionCommentCount",
      header: "Question Comment Count",
    },
    {
      key: "authId",
      header: "Auth Id",
    },
    {
      key: "emailAddress",
      header: "Email Address",
    },
    {
      key: "username",
      header: "Username",
    },
    {
      key: "realname",
      header: "Realname",
    },
    {
      key: "phoneNumber",
      header: "Phone Number",
    },
    {
      key: "createDate",
      header: "Create Date",
    },
    {
      key: "banDate",
      header: "Ban Date",
    },
    {
      key: "actions",
      header: translate("table.actions"),
      render: (_, row) => (
        <span className="flex justify-center items-center gap-3">
          <TableShowButton
            onClick={() => {
              show("users", row.authId);
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
  } = useList<IResponsePaginatedList<IUser>>({
    // resource: "user/find/all",
    resource: API_ROUTES.USERS.GET.ALL_WITH_PAGINATION,
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
    // filters: [
    //   {
    //     field: "searchText",
    //     operator: "eq",
    //     value: paginationInstance.debouncedSearchText,
    //   },
    // ],
  });

  //todo pagination durumları için kontrol gerekebilir...
  usePaginationResponse<
    IUser,
    GetListResponse<IResponsePaginatedList<IUser>> | undefined
  >(response, paginationInstance);

  return (
    <div style={{ padding: "16px" }}>
      <div className="flex w-full mb-7 justify-between">
        <h2 className="font-bold text-xl">
          {translate("pages.users.list.title")}
        </h2>
      </div>

      <WarningModal
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        title="Warning"
        message={`Are you sure you want to delete ${clickedRow?.username}? \n This action cannot be undone. NOTHING HAPPENS YET SINCE NO DELETION FOR USER.`}
        onConfirm={() => {
          setIsWarningModalOpen(false);
        }}
        confirmText="Yes"
        cancelText="No"
      />

      <Table<IUser>
        columns={columns}
        rows={(response?.data as unknown as IUser[]) || []}
        paginationInstance={paginationInstance}
        isSearchable={true}
      />
    </div>
  );
};
