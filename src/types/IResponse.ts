import { BaseRecord } from "@refinedev/core";

export interface IMetaData {
  totalRecords: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
}

export interface IResponsePaginatedList<TData extends BaseRecord> {
  data: TData[];
  meta: IMetaData;
}

export interface IValidationErrors {
  [key: string]: string;
}
