import React from "react";
import { IResponsePaginatedList } from "../types/IResponse";
import { BaseRecord, GetListResponse } from "@refinedev/core";
import { IPaginationLibrary } from "../types/IPagination";

// GetListResponse
// response data after useList is sent here. However, useList returns an array type of given types.
// But response data is an IResponsePaginatedList type.
const usePaginationResponse = <
  TData extends BaseRecord,
  TLoadedReponse extends
    | GetListResponse<IResponsePaginatedList<TData>>
    | undefined
>(
  loadedPageOptions: TLoadedReponse,
  paginationLibrary: IPaginationLibrary<TData>
) => {
  React.useEffect(() => {
    if (loadedPageOptions?.data) {
      paginationLibrary.handleMetaData(loadedPageOptions.meta);
      paginationLibrary.setData(loadedPageOptions.data as unknown as TData[]);
    }
  }, [loadedPageOptions]);
};

export default usePaginationResponse;
