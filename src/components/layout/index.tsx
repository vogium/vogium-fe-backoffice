import type { PropsWithChildren } from "react";
import { Breadcrumb } from "../breadcrumb";
import { Menu } from "../menu";
import { LanguageSwitcher } from "../language-switcher";
import { useLogout, useTranslate } from "@refinedev/core";
import GlobalPageSpinner from "../spinner/GlobalPageSpinner";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { mutate: logout } = useLogout();
  const translate = useTranslate();

  return (
    <div className="bg-background flex">
      <GlobalPageSpinner></GlobalPageSpinner>

      <Menu />

      <div className="w-full min-h-screen overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-3">
            <Breadcrumb />
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <button
                onClick={() => logout()}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>{translate("actions.logout")}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="bg-background-v2 dark:dark:bg-theme-night">
          <div className="px-6 py-4">{children}</div>
        </main>
        {/* <main className="flex flex-col flex-grow bg-background-v2 dark:dark:bg-theme-night">
          <div className="flex-grow px-6 py-4">{children}</div>
        </main> */}
      </div>
    </div>
  );
};
