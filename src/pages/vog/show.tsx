import {
  useNavigation,
  useNotification,
  useParsed,
  useShow,
  useTranslate,
} from "@refinedev/core";

import { useState } from "react";
import * as yup from "yup";
import { useCommonStates } from "../../hooks/useCommonStates";
import { IGroup } from "../../types/IFormTabs";
import { IVog } from "../../types/IVog";
import React from "react";
import { PieChart } from "../../components/charts/PieChart";
import { TabPanel } from "../../components/TabPanel";
import DynamicFormWithGroups from "../../components/form/DynamicFormWithGroups";

export const VogShow = () => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [activeTab, setActiveTab] = useState<number>(0);
  const { list } = useNavigation();
  const { open } = useNotification();
  const { id: authId } = useParsed();
  const translate = useTranslate();

  const commonState = useCommonStates<IVog>({});

  const { query } = useShow({
    resource: "vog/find/getVogById",
    id: authId,
    queryOptions: {
      // enabled: checkAuthenticationControl,
    },
  });
  const { data: response, isFetching, isError, refetch } = query;

  const record = response?.data;
  //console.log(record);

  const formGroups: IGroup[] = [
    {
      label: translate("resources.vogs.groups.basicInformation"),
      isLabelVisible: true,
      fields: [
        {
          id: "authorId",
          label: translate("resources.vogs.fields.authorId"),
          type: "text",
          colSpan: 6,
          editable: false,
          //todo editable alanı yetkiye göre true ya da false olacak
          defaultValue: record?.authorId,
          placeholder: record?.authorId,
          validationMessage: commonState.validationMessages?.authorId,
        },
        {
          id: "description",
          label: translate("resources.vogs.fields.description"),
          type: "text",
          editable: false,
          colSpan: 6,
          defaultValue: record?.description,
          placeholder: record?.description,
          validationMessage: commonState.validationMessages?.description,
        },
        {
          id: "medias",
          label: translate("resources.vogs.fields.medias"),
          type: "text",
          editable: false,
          colSpan: 6,
          defaultValue: record?.medias,
          placeholder: record?.medias,
          validationMessage: commonState.validationMessages?.medias,
        },
        {
          id: "likeCount",
          label: translate("resources.vogs.fields.likeCount"),
          type: "number",
          editable: false,
          colSpan: 6,
          defaultValue: record?.likeCount,
          placeholder: record?.likeCount,
          validationMessage: commonState.validationMessages?.likeCount,
        },
        //select
        {
          id: "commentCount",
          label: translate("resources.vogs.fields.commentCount"),
          type: "number",
          editable: false,
          colSpan: 6,
          placeholder: record?.commentCount,
          validationMessage: commonState.validationMessages?.commentCount,
        },
        {
          id: "viewsCount",
          label: translate("resources.vogs.fields.viewsCount"),
          type: "number",
          editable: false,
          colSpan: 6,
          defaultValue: record?.viewsCount,
          placeholder: record?.viewsCount,
          validationMessage: commonState.validationMessages?.viewsCount,
        },

        //todo bunlar bir api'den gelmeli..
        {
          id: "vogStyles",
          label: translate("resources.vogs.fields.vogStyles"),
          type: "text",
          editable: false,
          colSpan: 6,
          defaultValue: record?.vogStyles,
          placeholder: record?.vogStyles,
          validationMessage: commonState.validationMessages?.vogStyles,
        },
        {
          id: "concepts",
          label: translate("resources.vogs.fields.concepts"),
          type: "text",
          editable: false,
          colSpan: 6,
          defaultValue: record?.concepts,
          placeholder: record?.concepts,
          validationMessage: commonState.validationMessages?.concepts,
        },
      ],
    },
    {
      label: translate("resources.vogs.groups.sex"),
      isLabelVisible: true,
      fields: [
        {
          id: "sex",
          label: translate("resources.vogs.fields.sex"),
          type: "text",
          colSpan: 6,
          editable: false,
          defaultValue: record?.sex,
          placeholder: record?.sex,
          validationMessage: commonState.validationMessages?.sex,
        },
        {
          id: "subsPermission",
          label: translate("resources.vogs.fields.subsPermission"),
          type: "text",
          colSpan: 6,
          editable: false,
          defaultValue: record?.subsPermission,
          placeholder: record?.subsPermission,
          validationMessage: commonState.validationMessages?.subsPermission,
        },
        {
          id: "isSponsored",
          label: translate("resources.vogs.fields.isSponsored"),
          type: "checkbox",
          colSpan: 6,
          editable: false,
          defaultValue: record?.isSponsored,
          placeholder: record?.isSponsored,
          validationMessage: commonState.validationMessages?.isSponsored,
        },
        {
          id: "hashtags",
          label: translate("resources.vogs.fields.hashtags"),
          type: "text",
          colSpan: 6,
          editable: false,
          defaultValue: record?.hashtags,
          placeholder: record?.hashtags,
          validationMessage: commonState.validationMessages?.hashtags,
        },
        {
          id: "vogProducts",
          label: translate("resources.vogs.fields.vogProducts"),
          type: "text",
          colSpan: 6,
          editable: false,
          defaultValue: record?.vogProducts,
          placeholder: record?.vogProducts,
          validationMessage: commonState.validationMessages?.vogProducts,
        },
        {
          id: "creationDate",
          label: translate("resources.vogs.fields.creationDate"),
          type: "datePicker",
          colSpan: 6,
          //Todo yeniden düzenlenecek, form data false record ise tru oluyor :((((
          editable: false,
          defaultValue: record?.creationDate,
          placeholder: record?.creationDate,
          validationMessage: commonState.validationMessages?.creationDate,
        },
        {
          id: "lastUpdateDate",
          label: translate("resources.vogs.fields.lastUpdateDate"),
          type: "datePicker",
          colSpan: 6,
          editable: false,
          defaultValue: record?.lastUpdateDate,
          placeholder: record?.lastUpdateDate,
          validationMessage: commonState.validationMessages?.lastUpdateDate,
        },
        {
          id: "isDeleted",
          label: translate("resources.vogs.fields.isDeleted"),
          type: "checkbox",
          colSpan: 6,
          editable: false,
          defaultValue: record?.isDeleted,
          placeholder: record?.isDeleted,
          validationMessage: commonState.validationMessages?.isDeleted,
        }
        // todo Hesap oluşturma tarihi ve giriş sıklığı.
      ],
    },
    /*{
      label: translate(
        "resources.vogs.groups.socialAndStatisticalInformation"
      ),
      isLabelVisible: true,
      fields: [
        {
          id: "followerCount",
          label: translate("resources.vogs.fields.followerCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.followerCount,
          placeholder: record?.followerCount,
          validationMessage: commonState.validationMessages?.followerCount,
        },
        {
          id: "followingCount",
          label: translate("resources.vogs.fields.followingCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.followingCount,
          placeholder: record?.followingCount,
          validationMessage: commonState.validationMessages?.followingCount,
        },
        {
          id: "subscriberCount",
          label: translate("resources.vogs.fields.subscriberCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.subscriberCount,
          placeholder: record?.subscriberCount,
          validationMessage: commonState.validationMessages?.subscriberCount,
        },
        {
          id: "subscriptionCount",
          label: translate("resources.vogs.fields.subscriptionCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.subscriptionCount,
          placeholder: record?.subscriptionCount,
          validationMessage: commonState.validationMessages?.subscriptionCount,
        },
        {
          id: "totalExpenditure",
          label: translate("resources.vogs.fields.totalExpenditure"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.totalExpenditure,
          placeholder: record?.totalExpenditure,
          validationMessage: commonState.validationMessages?.totalExpenditure,
        },
        {
          id: "lastLoginDate",
          label: translate("resources.vogs.fields.lastLoginDate"),
          type: "datePicker",
          colSpan: 6,
          editable: false,
          defaultValue: record?.lastLoginDate,
          placeholder: record?.lastLoginDate,
          validationMessage: commonState.validationMessages?.lastLoginDate,
        },
        {
          id: "lastLogoutDate",
          label: translate("resources.vogs.fields.lastLogoutDate"),
          type: "datePicker",
          colSpan: 6,
          editable: false,
          defaultValue: record?.lastLogoutDate,
          placeholder: record?.lastLogoutDate,
          validationMessage: commonState.validationMessages?.lastLogoutDate,
        },
      ],
    },*/
    /*{
      label: translate("resources.vogs.groups.accountInteractions"),
      isLabelVisible: true,
      fields: [
        {
          id: "vogCount",
          label: translate("resources.vogs.fields.vogCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.vogCount,
          placeholder: record?.vogCount,
          validationMessage: commonState.validationMessages?.vogCount,
        },
        {
          id: "vogLikeCount",
          label: translate("resources.vogs.fields.vogLikeCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.vogLikeCount,
          placeholder: record?.vogLikeCount,
          validationMessage: commonState.validationMessages?.vogLikeCount,
        },
        {
          id: "postCommentCount",
          label: translate("resources.vogs.fields.postCommentCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.postCommentCount,
          placeholder: record?.postCommentCount,
          validationMessage: commonState.validationMessages?.postCommentCount,
        },
        {
          id: "favoriteBusinessCount",
          label: translate("resources.vogs.fields.favoriteBusinessCount"),
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
          label: translate("resources.vogs.fields.blogsReadCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.blogsReadCount,
          placeholder: record?.blogsReadCount,
          validationMessage: commonState.validationMessages?.blogsReadCount,
        },
        {
          id: "blogsLikeCount",
          label: translate("resources.vogs.fields.blogsLikeCount"),
          type: "number",
          colSpan: 6,
          editable: true,
          defaultValue: record?.blogsLikeCount,
          placeholder: record?.blogsLikeCount,
          validationMessage: commonState.validationMessages?.blogsLikeCount,
        },
      ],
    },*/
  ];

  const formTabs = [
    {
      id: "profile",
      label: translate("resources.vogs.tabs.profile"),
    },
    /*{
      id: "reports",
      label: translate("resources.vogs.tabs.reports"),
    },
    {
      id: "offers",
      label: translate("resources.vogs.tabs.offers"),
    },
    {
      id: "contracts",
      label: translate("resources.vogs.tabs.contracts"),
    },*/
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
    console.log(tabIndex)
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
      default:
        return <div>Tab Not Found</div>;
    }
  };

  return (
    <div className="w-full">

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
