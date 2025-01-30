import React from "react";
import { IColumn } from "../../types/ITable";
import { BaseRecord, useTranslate } from "@refinedev/core";
import { IPaginationLibrary } from "../../types/IPagination";
import TableSearch from "./TableSearch";

interface TableProps<T extends BaseRecord> {
  columns: IColumn<T>[];
  rows: T[];
  paginationInstance: IPaginationLibrary<T>;
  isSearchable?: boolean;
  disablePagination?: boolean;
}

const isSafeToRender = (value: unknown): value is React.ReactNode => {
  return (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    React.isValidElement(value)
  );
};

export function Table<T extends BaseRecord>({
  columns,
  rows,
  paginationInstance,
  isSearchable = true,
  disablePagination = false,
}: TableProps<T>) {
  const translate = useTranslate();

  return (
    <div className="w-full ">
      {isSearchable && (
        <TableSearch
          searchText={paginationInstance.searchText}
          handleSearch={(searchText: string) =>
            paginationInstance.handleSearch(searchText)
          }
        />
      )}

      <div className="w-full relative overflow-auto">
        <table className="w-full ">
          <thead className="text-xs text-black border-x dark:bg-gray-700 dark:text-gray-400 dark:border-theme-night-light top-0 bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="p-4 border-b border-custom-gray-v2/10  dark:border-theme-night-light text-start w-fit"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=" verflow-auto">
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="odd:bg-white even:bg-gray-50 border-x dark:border-theme-night-light dark:even:bg-theme-night dark:odd:bg-theme-night hover:bg-gray-200 dark:hover:bg-gray-500 animation-smooth-fast dark:text-white"
              >
                {columns.map((column) => {
                  const value =
                    column.key === "actions"
                      ? null
                      : row[column.key as keyof T];
                  return (
                    <td
                      key={String(column.key)}
                      className="p-4 border-b border-custom-gray-v2/10 dark:border-theme-night-light"
                    >
                      {column.render
                        ? column.render(value, row)
                        : isSafeToRender(value)
                        ? value
                        : String(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center px-4 py-3 dark:bg-theme-night-v2 relative bg-white dark:bg-gray-500 border border-custom-gray-v2/10 dark:border-theme-night-light rounded-b-md">
        {!disablePagination ? (
          <div className="text-sm text-black dark:text-white">
            Showing{" "}
            <b>
              {paginationInstance.currentPage * paginationInstance.pageSize -
                paginationInstance.pageSize +
                1}
              -
              {paginationInstance.currentPage * paginationInstance.pageSize >
              paginationInstance.totalRecords
                ? paginationInstance.totalRecords
                : paginationInstance.currentPage * paginationInstance.pageSize}
            </b>{" "}
            of <b>{paginationInstance.totalRecords}</b> entries
            <select
              className="ml-1 px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-black bg-white border border-custom-gray-v2/10 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease dark:bg-theme-night dark:text-white dark:border-theme-night-light dark:hover:bg-theme-night-light"
              value={paginationInstance.pageSize}
              onChange={(e) =>
                paginationInstance.changePageSize(parseInt(e.target.value))
              }
            >
              {paginationInstance.pageSizeOptions.map((size: number) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="text-sm text-black dark:text-white">
            Showing <b>1-{rows?.length}</b> of <b>{rows?.length}</b> entries
          </div>
        )}

        {!disablePagination && (
          <div className="flex space-x-1">
            <button
              className={
                "px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-brand bg-white border border-brand/20 rounded hover:bg-brand hover:border-brand transition duration-200 ease " +
                (!paginationInstance.canGoPreviousPage() ? "!bg-gray-100" : "")
              }
              onClick={() => paginationInstance.goPreviousPage()}
              disabled={!paginationInstance.canGoPreviousPage()}
              style={{
                cursor: paginationInstance.canGoPreviousPage()
                  ? "pointer"
                  : "not-allowed",
                userSelect: "none",
              }}
            >
              {translate("table.previous")}
            </button>

            {/* Page Numbers */}
            {Array.from({ length: paginationInstance.totalPages })
              .map((_, i) => i + 1) // Generate page numbers
              .filter((page) => {
                // Display first 3 pages, last page, and current ±1

                return (
                  (page >= paginationInstance.currentPage - 2 &&
                    page <= paginationInstance.currentPage + 2) ||
                  page === paginationInstance.totalPages ||
                  // Math.abs(page - pageIndex - 1) <= 1
                  Math.abs(page - paginationInstance.currentPage - 1) <= 1
                );
              })
              .reduce<(number | string)[]>((pages, page, idx, array) => {
                // Add "..." if there's a gap between numbers
                if (idx > 0 && page - array[idx - 1] > 1) {
                  pages.push("...");
                }
                pages.push(page);
                return pages;
              }, [])
              .map((page, idx) =>
                page === "..." ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-slate-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={`page-${page}`}
                    onClick={() => {
                      paginationInstance.goToPage(parseInt(page.toString()));
                    }}
                    className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal
                      ${
                        typeof page === "number" &&
                        paginationInstance.currentPage ===
                          parseInt(page.toString())
                          ? "bg-gray-50 text-brand hover:bg-brand hover:text-white"
                          : "text-black bg-white hover:bg-slate-50"
                      }

                    border border-brand/20 rounded transition duration-200 ease`}
                  >
                    {page}
                  </button>
                )
              )}

            <button
              className={
                "px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-brand bg-white border border-brand/20 rounded hover:bg-slate-50 hover:border-brand transition duration-200 ease " +
                (!paginationInstance.canGoPreviousPage() ? "!bg-gray-100" : "")
              }
              style={{
                cursor: paginationInstance.canGoNextPage()
                  ? "pointer"
                  : "not-allowed",
                userSelect: "none",
              }}
              onClick={() => paginationInstance.goNextPage()}
              disabled={!paginationInstance.canGoNextPage()}
            >
              {translate("table.next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
