import React, { useCallback } from "react";
import debounce from "lodash/debounce";
import { BaseRecord } from "@refinedev/core";
import { IMetaData } from "../types/IResponse";
import { IPaginationLibrary } from "../types/IPagination";

// interface PaginationLibraryProps {}

//todo hook çalıştırılabilir..
//todo eski adı paginationLibrary
export default function usePagination<
  TData extends BaseRecord
>(): IPaginationLibrary<TData> {
  const [searchText, setSearchText] = React.useState("");
  const [debouncedSearchText, setDebouncedSearchText] = React.useState("");
  const [pageSize, setPageSize] = React.useState<number>(10);
  const pageSizeOptions = [10, 20, 50, 100];
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [totalRecords, setTotalRecords] = React.useState<number>(0);
  const [data, setData] = React.useState<TData[]>([]);
  const [isPaginationLoading, setIsPaginationLoading] =
    React.useState<boolean>(false);

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setDebouncedSearchText(text);
      setIsPaginationLoading(true);
    }, 600),
    []
  );

  const handleSearch = (text: string) => {
    const trimmedText = text.trim();
    setSearchText(text);
    debouncedSearch(trimmedText);
  };

  const goNextPage = () => {
    if (!canGoNextPage()) {
      return;
    }

    setCurrentPage((prev) => prev + 1);
    setIsPaginationLoading(true);
  };

  const goPreviousPage = () => {
    if (!canGoPreviousPage()) {
      return;
    }
    setCurrentPage(currentPage - 1);
    setIsPaginationLoading(true);
  };

  const canGoNextPage = () => {
    return currentPage < totalPages;
  };

  const canGoPreviousPage = () => {
    return currentPage > 1;
  };

  const changePageSize = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    setIsPaginationLoading(true);
  };

  const handleMetaData = (metaData: IMetaData) => {
    setCurrentPage(metaData.currentPage);
    setTotalPages(metaData.totalPages);
    setTotalRecords(metaData.totalRecords);
  };

  const goToPage = (page: number) => {
    if (page < 0 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
    setIsPaginationLoading(true);
  };

  return {
    searchText,
    pageSize,
    pageSizeOptions,
    currentPage,
    totalRecords,
    totalPages,
    canGoPreviousPage,
    canGoNextPage,
    goNextPage,
    goPreviousPage,
    handleSearch,
    handleMetaData,
    changePageSize,
    goToPage,
    debouncedSearchText,
    setData,
    data,
    isPaginationLoading,
    setIsPaginationLoading,
  };
}
