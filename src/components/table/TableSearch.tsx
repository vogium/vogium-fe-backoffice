import { useTranslate } from "@refinedev/core";

export default function TableSearch({
  searchText,
  handleSearch,
}: {
  searchText: string;
  handleSearch: (searchText: string) => void;
}) {
  const translate = useTranslate();

  return (
    <div className="flex relative md:justify-end items-center px-4 py-3 bg-white dark:bg-gray-500 border border-custom-gray-v2/10 dark:border-theme-night-light rounded-t-md">
      <img
        src="/icons/search.svg"
        className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute max-md:left-6 max-md:top-78 md:right-[216px] md:top-78"
      />
      <input
        type="text"
        placeholder={translate("table.search")}
        className="px-5 py-3 min-w-9 min-h-9 ps-10 dark:bg-theme-night-v2 focus:bg-white dark:text-white dark:focus:bg-theme-night-v2 dark:focus:text-white dark:
        text-md font-normal text-black bg-white border border-custom-gray-v2/10  rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
