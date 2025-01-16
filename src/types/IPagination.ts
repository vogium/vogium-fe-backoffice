import { BaseRecord } from "@refinedev/core";
import { IMetaData } from "./IResponse";

export interface IPaginationLibrary<TData extends BaseRecord> {
  searchText: string;
  pageSize: number;
  pageSizeOptions: number[];
  currentPage: number;
  totalRecords: number;
  totalPages: number;
  canGoPreviousPage: () => boolean;
  canGoNextPage: () => boolean;
  goNextPage: () => void;
  goPreviousPage: () => void;
  handleSearch: (searchText: string) => void;
  handleMetaData: (meta: IMetaData) => void;
  changePageSize: (size: number) => void;
  goToPage: (page: number) => void;
  debouncedSearchText: string;
  setData: (data: TData[]) => void;
  data: TData[];
  isPaginationLoading: boolean;
  setIsPaginationLoading: (isLoading: boolean) => void;
}
