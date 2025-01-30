import { useParsed, useShow, useTranslate } from "@refinedev/core";
import { IUser } from "../../types/IUser";
import React, { useState } from "react";
import { TabPanel } from "../../components/TabPanel";
import UserComplaintsTab from "./sections/UserComplaintsTab";
import UserProfileTab from "./sections/UserProfileTab";
import { API_ROUTES } from "../../contants/apiRoutes";
import DangerMessageBox from "../../components/messageBoxes/DangerMessageBox";
import UserStatisticsTab from "./sections/UserStatisticsTab";
import { UserStatus } from "../../enums/user/user-status.enum";
import UserOffersTab from "./sections/UserOffersTab";
import UserContractsTab from "./sections/UserContractsTab";
import UserAccountingTab from "./sections/UserAccountingTab";
import UserDocumentsTab from "./sections/UserDocumentsTab";
import UserCollaborationsTab from "./sections/UserCollaborationsTab";

export const UserShow = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { id: authId } = useParsed();
  const translate = useTranslate();

  const { query } = useShow({
    resource: API_ROUTES.USERS.GET.BY_AUTH_ID,
    id: authId,
  });
  const { data: userResponse, isError: isUserError } = query;

  const record = userResponse?.data as IUser;

  const formTabs = [
    {
      id: "profile",
      label: translate("resources.users.tabs.profile"),
      isVisible: true,
    },
    {
      id: "reports",
      label: translate("resources.users.tabs.reports"),
      isVisible: true,
    },
    {
      id: "statistics",
      label: translate("resources.users.tabs.statistics"),
      isVisible: true,
    },
    {
      id: "offers",
      label: translate("resources.users.tabs.offers"),
      isVisible: record?.userStatus === UserStatus.VOGGER,
    },
    {
      id: "contracts",
      label: translate("resources.users.tabs.contracts"),
      isVisible: true,
    },
    {
      id: "accounting",
      label: translate("resources.users.tabs.accounting"),
      isVisible: true,
    },
    {
      id: "documents",
      label: translate("resources.users.tabs.documents"),
      isVisible: true,
    },
    {
      id: "collaborations",
      label: translate("resources.users.tabs.collaborations"),
      isVisible: true,
    },
  ] as {
    id: string;
    label: string;
    isVisible: boolean;
  }[];

  const getTabChildren = (tabIndex: number) => {
    switch (tabIndex) {
      case 0:
        return <UserProfileTab userData={record}></UserProfileTab>;
      case 1:
        return (
          <div className="p-4 bg-white rounded-lg shadow-md my-3">
            <UserComplaintsTab></UserComplaintsTab>
          </div>
        );
      case 2:
        return <UserStatisticsTab userData={record}></UserStatisticsTab>;
      case 3:
        return (
          <div className="p-4 bg-white rounded-lg shadow-md my-3">
            <UserOffersTab userData={record}></UserOffersTab>
          </div>
        );
      case 4:
        return (
          <div className="p-4 bg-white rounded-lg shadow-md my-3">
            <UserContractsTab userData={record}></UserContractsTab>
          </div>
        );
      case 5:
        return (
          <div className="p-4 bg-white rounded-lg shadow-md my-3">
            <UserAccountingTab userData={record} />
          </div>
        );
      case 6:
        return (
          <div className="p-4 bg-white rounded-lg shadow-md my-3">
            <UserDocumentsTab userData={record} />
          </div>
        );
      case 7:
        return (
          <div className="p-4 bg-white rounded-lg shadow-md my-3">
            <UserCollaborationsTab userData={record} />
          </div>
        );
      default:
        return (
          <DangerMessageBox title="Invalid View" description="Wrong value." />
        );
    }
  };

  if (isUserError) {
    return (
      <DangerMessageBox
        title="Error"
        description="An error occured while getting the user"
      />
    );
  }

  return (
    <div className="w-full">
      <div className="w-full">
        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white rounded-t-lg shadow-md my-4">
          <nav className="flex -mb-px">
            {formTabs.map((tab, index) => {
              return (
                <button
                  key={tab.id}
                  className={`py-4 px-6 font-medium text-sm animation-smooth-fast border-b-2 border-transparent ${
                    activeTab === index
                      ? "border-b-2 !border-brand text-brand"
                      : "text-brand/50 hover:text-brand/50"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {formTabs.map((tab, index) => (
          <React.Fragment key={tab.id}>
            <TabPanel value={activeTab} index={index}>
              {getTabChildren(activeTab)}
            </TabPanel>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
