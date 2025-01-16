import {
  useNavigation,
  useNotification,
  useParsed,
  useResource,
  useShow,
  useTranslate,
} from "@refinedev/core";

import { IFormField } from "../../types/IForm";
import { useCommonStates } from "../../hooks/useCommonStates";
import { IUser } from "../../types/IUser";
import userUpdateSchema from "../../schemas/user/user-update.schema";
import { IFormTab, IGroup } from "../../types/IFormTabs";
import * as yup from "yup";
import React, { useState } from "react";
import { OneLineAreaChart } from "../../components/charts/OneLineAreaChart";
import { LineChart } from "../../components/charts/LineChart";
import DynamicFormWithGroups from "../../components/form/DynamicFormWithGroups";
import { TabPanel } from "../../components/TabPanel";
import { Table } from "../../components/table/Table";
import { IReport } from "../../types/IReport";
import { IColumn } from "../../types/ITable";
import paginationLibrary from "../../lib/paginationLibrary";
import TableShowButton from "../../components/table/TableShowButton";
import TableDeleteButton from "../../components/table/TableDeleteButton";
import { getReportTypeLabel, ReportType } from "../../enums/ReportEnums";
import {
  getReportStatusLabel,
  ReportStatus,
} from "../../enums/ReportStatusEnum";
import SuccessButton from "../../components/buttons/SuccessButton";
import SuccessModal from "../../components/modals/SuccessModal";
import UserComplaintsTab from "./sections/UserComplaintsTab";
import { PieChart } from "../../components/charts/PieChart";

export const UserShow = () => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [activeTab, setActiveTab] = useState<number>(0);
  const { list } = useNavigation();
  const { open } = useNotification();
  const { id: authId } = useParsed();
  const translate = useTranslate();

  const commonState = useCommonStates<IUser>({});

  const { query } = useShow({
    resource: "user/find/byAuthId",
    id: authId,
    queryOptions: {
      // enabled: checkAuthenticationControl,
    },
  });
  const { data: response, isFetching, isError, refetch } = query;

  const record = response?.data;

  const formGroups: IGroup[] = [
    {
      label: translate("resources.users.groups.basicInformation"),
      isLabelVisible: true,
      fields: [
        {
          id: "username",
          label: translate("resources.users.fields.username"),
          type: "text",
          colSpan: 6,
          //todo editable alanı yetkiye göre true ya da false olacak
          editable: true,
          defaultValue: record?.username,
          placeholder: record?.username,
          validationMessage: commonState.validationMessages?.username,
        },
        {
          id: "realname",
          label: translate("resources.users.fields.realname"),
          type: "text",
          editable: true,
          colSpan: 6,
          defaultValue: record?.realname,
          placeholder: record?.realname,
          validationMessage: commonState.validationMessages?.realname,
        },
        {
          id: "emailAddress",
          label: translate("resources.users.fields.emailAddress"),
          type: "email",
          editable: true,
          colSpan: 6,
          defaultValue: record?.emailAddress,
          placeholder: record?.emailAddress,
          validationMessage: commonState.validationMessages?.emailAddress,
        },
        {
          id: "phoneNumber",
          label: translate("resources.users.fields.phoneNumber"),
          type: "phone",
          editable: true,
          colSpan: 6,
          defaultValue: record?.phoneNumber,
          placeholder: record?.phoneNumber,
          validationMessage: commonState.validationMessages?.phoneNumber,
        },
        //select
        {
          id: "gender",
          label: translate("resources.users.fields.gender"),
          type: "select",
          editable: true,
          colSpan: 6,
          options: [
            {
              value: 0,
              label: translate("resources.users.fields.male"),
            },
            {
              value: 1,
              label: translate("resources.users.fields.female"),
            },
          ],
          placeholder: record?.gender,
          validationMessage: commonState.validationMessages?.gender,
        },
        {
          id: "birthDate",
          label: translate("resources.users.fields.birthDate"),
          type: "datePicker",
          editable: true,
          colSpan: 6,
          defaultValue: record?.birthDate,
          placeholder: record?.birthDate,
          validationMessage: commonState.validationMessages?.birthDate,
          maxDate: new Date(2003, 0, 1),
        },

        //todo bunlar bir api'den gelmeli..
        {
          id: "country",
          label: translate("resources.users.fields.country"),
          type: "select",
          options: [
            { value: "1", label: "Turkey" },
            { value: "2", label: "Germany" },
          ],
          editable: true,
          colSpan: 6,
          defaultValue: record?.country,
          placeholder: record?.country,
          validationMessage: commonState.validationMessages?.country,
        },
        {
          id: "city",
          label: translate("resources.users.fields.city"),
          type: "select",
          options: [
            { value: "1", label: "Adana" },
            { value: "2", label: "Adıyaman" },
          ],
          editable: true,
          colSpan: 6,
          defaultValue: record?.city,
          placeholder: record?.city,
          validationMessage: commonState.validationMessages?.city,
        },
      ],
    },
    {
      label: translate("resources.users.groups.accountStatusAndType"),
      isLabelVisible: true,
      fields: [
        {
          id: "accountType",
          label: translate("resources.users.fields.accountType"),
          type: "text",
          colSpan: 6,
          editable: true,
          defaultValue: record?.accountType,
          placeholder: record?.accountType,
          validationMessage: commonState.validationMessages?.accountType,
        },
        {
          id: "userStatus",
          label: translate("resources.users.fields.userStatus"),
          type: "text",
          colSpan: 6,
          editable: true,
          defaultValue: record?.userStatus,
          placeholder: record?.userStatus,
          validationMessage: commonState.validationMessages?.userStatus,
        },
        {
          id: "userType",
          label: translate("resources.users.fields.userType"),
          type: "text",
          colSpan: 6,
          editable: true,
          defaultValue: record?.userType,
          placeholder: record?.userType,
          validationMessage: commonState.validationMessages?.userType,
        },
        {
          id: "isBanned",
          label: translate("resources.users.fields.isBanned"),
          type: "checkbox",
          colSpan: 6,
          editable: true,
          defaultValue: record?.isBanned,
          placeholder: record?.isBanned,
          validationMessage: commonState.validationMessages?.isBanned,
        },
        {
          id: "banDate",
          label: translate("resources.users.fields.banDate"),
          type: "datePicker",
          colSpan: 6,
          editable: false,
          defaultValue: record?.banDate,
          placeholder: record?.banDate,
          validationMessage: commonState.validationMessages?.banDate,
        },
        {
          id: "expireBanDate",
          label: translate("resources.users.fields.expireBanDate"),
          type: "datePicker",
          colSpan: 6,
          //Todo yeniden düzenlenecek, form data false record ise tru oluyor :((((
          editable: !!record?.isBanned,
          defaultValue: record?.expireBanDate,
          placeholder: record?.expireBanDate,
          validationMessage: commonState.validationMessages?.expireBanDate,
        },
        {
          id: "isAccountVerified",
          label: translate("resources.users.fields.isAccountVerified"),
          type: "checkbox",
          colSpan: 6,
          editable: true,
          defaultValue: record?.isAccountVerified,
          placeholder: record?.isAccountVerified,
          validationMessage: commonState.validationMessages?.isAccountVerified,
        },
        {
          id: "isEmailVerified",
          label: translate("resources.users.fields.isEmailVerified"),
          type: "checkbox",
          colSpan: 6,
          editable: true,
          defaultValue: record?.isEmailVerified,
          placeholder: record?.isEmailVerified,
          validationMessage: commonState.validationMessages?.isEmailVerified,
        },
        {
          id: "isPhoneVerified",
          label: translate("resources.users.fields.isPhoneVerified"),
          type: "checkbox",
          colSpan: 6,
          editable: true,
          defaultValue: record?.isPhoneVerified,
          placeholder: record?.isPhoneVerified,
          validationMessage: commonState.validationMessages?.isPhoneVerified,
        },

        // todo Hesap oluşturma tarihi ve giriş sıklığı.
      ],
    },
    {
      label: translate(
        "resources.users.groups.socialAndStatisticalInformation"
      ),
      isLabelVisible: true,
      fields: [
        {
          id: "followerCount",
          label: translate("resources.users.fields.followerCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.followerCount,
          placeholder: record?.followerCount,
          validationMessage: commonState.validationMessages?.followerCount,
        },
        {
          id: "followingCount",
          label: translate("resources.users.fields.followingCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.followingCount,
          placeholder: record?.followingCount,
          validationMessage: commonState.validationMessages?.followingCount,
        },
        {
          id: "subscriberCount",
          label: translate("resources.users.fields.subscriberCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.subscriberCount,
          placeholder: record?.subscriberCount,
          validationMessage: commonState.validationMessages?.subscriberCount,
        },
        {
          id: "subscriptionCount",
          label: translate("resources.users.fields.subscriptionCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.subscriptionCount,
          placeholder: record?.subscriptionCount,
          validationMessage: commonState.validationMessages?.subscriptionCount,
        },
        {
          id: "totalExpenditure",
          label: translate("resources.users.fields.totalExpenditure"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.totalExpenditure,
          placeholder: record?.totalExpenditure,
          validationMessage: commonState.validationMessages?.totalExpenditure,
        },
        {
          id: "lastLoginDate",
          label: translate("resources.users.fields.lastLoginDate"),
          type: "datePicker",
          colSpan: 6,
          editable: false,
          defaultValue: record?.lastLoginDate,
          placeholder: record?.lastLoginDate,
          validationMessage: commonState.validationMessages?.lastLoginDate,
        },
        {
          id: "lastLogoutDate",
          label: translate("resources.users.fields.lastLogoutDate"),
          type: "datePicker",
          colSpan: 6,
          editable: false,
          defaultValue: record?.lastLogoutDate,
          placeholder: record?.lastLogoutDate,
          validationMessage: commonState.validationMessages?.lastLogoutDate,
        },
      ],
    },
    {
      label: translate("resources.users.groups.accountInteractions"),
      isLabelVisible: true,
      fields: [
        {
          id: "vogCount",
          label: translate("resources.users.fields.vogCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.vogCount,
          placeholder: record?.vogCount,
          validationMessage: commonState.validationMessages?.vogCount,
        },
        {
          id: "vogLikeCount",
          label: translate("resources.users.fields.vogLikeCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.vogLikeCount,
          placeholder: record?.vogLikeCount,
          validationMessage: commonState.validationMessages?.vogLikeCount,
        },
        {
          id: "postCommentCount",
          label: translate("resources.users.fields.postCommentCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.postCommentCount,
          placeholder: record?.postCommentCount,
          validationMessage: commonState.validationMessages?.postCommentCount,
        },
        {
          id: "favoriteBusinessCount",
          label: translate("resources.users.fields.favoriteBusinessCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.favoriteBusinessCount,
          placeholder: record?.favoriteBusinessCount,
          validationMessage:
            commonState.validationMessages?.favoriteBusinessCount,
        },
        {
          id: "blogsReadCount",
          label: translate("resources.users.fields.blogsReadCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.blogsReadCount,
          placeholder: record?.blogsReadCount,
          validationMessage: commonState.validationMessages?.blogsReadCount,
        },
        {
          id: "blogsLikeCount",
          label: translate("resources.users.fields.blogsLikeCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.blogsLikeCount,
          placeholder: record?.blogsLikeCount,
          validationMessage: commonState.validationMessages?.blogsLikeCount,
        },
      ],
    },
  ];

  const formTabs = [
    {
      id: "profile",
      label: translate("resources.users.tabs.profile"),
    },
    {
      id: "reports",
      label: translate("resources.users.tabs.reports"),
    },
    {
      id: "offers",
      label: translate("resources.users.tabs.offers"),
    },
    {
      id: "contracts",
      label: translate("resources.users.tabs.contracts"),
    },
  ] as {
    id: string;
    label: string;
  }[];

  const handleSubmit = (
    values: Record<string, unknown>,
    schema: yup.ObjectSchema<any>
  ) => {
    commonState.validateForm({
      schema: schema,
      body: values,
      successCallback: () => {
        console.log("UserShow.ts :>> Form Data:", values);
      },
    });
  };

  const getTabChildren = (tabIndex: number) => {
    switch (tabIndex) {
      case 0:
        return (
          <DynamicFormWithGroups
            //className=""
            groups={formGroups}
            formData={formData}
            onSubmit={(values) => {
              console.log("values", values);
            }}
            setFormData={setFormData}
          />
        );
      case 1:
        return (
          <div className="p-4 bg-white rounded-lg shadow-md my-5">
            <UserComplaintsTab></UserComplaintsTab>
          </div>
        );
      default:
        return <div>Tab Not Found</div>;
    }
  };

  return (
    <div className="w-full">
      {/* <OneLineAreaChart
        label="2021 Yılı Aylık Kullanıcı Sayısı"
        className="container-adjusted w-1/2 "
        data={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        labels={[
          "2021-01-01",
          "2021-02-01",
          "2021-03-01",
          "2021-04-01",
          "2021-05-01",
          "2021-06-01",
          "2021-07-01",
          "2021-08-01",
          "2021-09-01",
          "2021-10-01",
        ]}
      ></OneLineAreaChart>
      <OneLineAreaChart
        label="2021 Yılı Aylık Kullanıcı Sayısı"
        className="container-adjusted w-1/2 "
        data={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        labels={[
          "2021-01-01",
          "2021-02-01",
          "2021-03-01",
          "2021-04-01",
          "2021-05-01",
          "2021-06-01",
          "2021-07-01",
          "2021-08-01",
          "2021-09-01",
          "2021-10-01",
        ]}
      ></OneLineAreaChart> */}

      <PieChart
        label="User Statistics Distribution"
        className="container-adjusted w-1/2 bg-white rounded-lg shadow-md my-5"
        data={[30, 40, 20, 10]}
        labels={["Followers", "Following", "Posts", "Comments"]}
      />

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white rounded-lg shadow-md my-5">
        <nav className="flex -mb-px">
          {formTabs.map((tab, index) => {
            return (
              <button
                key={tab.id}
                className={`py-4 px-6 font-medium text-sm animation-smooth-fast ${
                  activeTab === index
                    ? "border-b-2 border-brand text-brand"
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
  );
};
