import {
  useNavigation,
  useNotification,
  useParsed,
  useResource,
  useShow,
  useTranslate,
} from "@refinedev/core";
import DynamicFormWithTabs from "../../components/form/DynamicFormWithTabs";
import { IFormField } from "../../types/IForm";
import { useCommonStates } from "../../hooks/useCommonStates";
import { IUser } from "../../types/IUser";
import userUpdateSchema from "../../schemas/user/user-update.schema";
import { IFormTab } from "../../types/IFormTabs";
import * as yup from "yup";
import { useState } from "react";
import { OneLineAreaChart } from "../../components/charts/OneLineAreaChart";
import { LineChart } from "../../components/charts/LineChart";

export const UserShow = () => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const { edit, list } = useNavigation();
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

  const formFields: IFormField[] = [];

  //   Temel Bilgiler
  // Kullanıcı Adı (username)
  // Gerçek İsim (realname)
  // E-posta Adresi (emailAddress)
  // Telefon Numarası (phoneNumber)
  // Cinsiyet (sex)
  // Doğum Tarihi (birthDate)
  // Şehir ve Ülke (city, country)
  // Hesap Durumu ve Tipi
  // Hesap Türü (accountType)
  // Kullanıcı Durumu (userStatus)
  // Üyelik Tipi (userType)
  // Ban Durumu (isBanned, banDate, expireBanDate)
  // Onay Durumu (isAccountVerified, isEmailVerified, isPhoneVerified)
  // Hesap oluşturma tarihi ve giriş sıklığı.
  // Sosyal ve İstatistiksel Bilgiler
  // Takipçi Sayısı (followerCount)
  // Takip Edilen Sayısı (followingCount)
  // Abone Sayısı (subscriberCount)
  // Abonelik Sayısı (subscriptionCount)
  // Toplam Harcama (totalExpenditure)
  // Son Giriş ve Çıkış Tarihi (lastLoginDate, lastLogoutDate)
  // Hesap Etkileşimleri
  // Vog Sayısı (vogCount)
  // Beğeni Sayısı (vogLikeCount)
  // Yorum Sayısı (postCommentCount)
  // Favori İşletme Sayısı (favoriteBusinessCount)
  // Blog Okuma ve Beğenme Sayısı (blogsReadCount, blogsLikeCount)

  const formTabs = [
    {
      id: "profile",
      label: translate("resources.users.tabs.profile"),
      onSubmit: (values) => {
        handleSubmit(values, userUpdateSchema);
      },
      isVisible: true,
      groups: [
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
              editable: formData.isBanned,
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
              validationMessage:
                commonState.validationMessages?.isAccountVerified,
            },
            {
              id: "isEmailVerified",
              label: translate("resources.users.fields.isEmailVerified"),
              type: "checkbox",
              colSpan: 6,
              editable: true,
              defaultValue: record?.isEmailVerified,
              placeholder: record?.isEmailVerified,
              validationMessage:
                commonState.validationMessages?.isEmailVerified,
            },
            {
              id: "isPhoneVerified",
              label: translate("resources.users.fields.isPhoneVerified"),
              type: "checkbox",
              colSpan: 6,
              editable: true,
              defaultValue: record?.isPhoneVerified,
              placeholder: record?.isPhoneVerified,
              validationMessage:
                commonState.validationMessages?.isPhoneVerified,
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
              validationMessage:
                commonState.validationMessages?.subscriberCount,
            },
            {
              id: "subscriptionCount",
              label: translate("resources.users.fields.subscriptionCount"),
              type: "number",
              colSpan: 6,
              editable: true,
              defaultValue: record?.subscriptionCount,
              placeholder: record?.subscriptionCount,
              validationMessage:
                commonState.validationMessages?.subscriptionCount,
            },
            {
              id: "totalExpenditure",
              label: translate("resources.users.fields.totalExpenditure"),
              type: "number",
              colSpan: 6,
              editable: true,
              defaultValue: record?.totalExpenditure,
              placeholder: record?.totalExpenditure,
              validationMessage:
                commonState.validationMessages?.totalExpenditure,
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
              validationMessage:
                commonState.validationMessages?.postCommentCount,
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
      ],
    },
    {
      id: "reports",
      //Kullanıcı hakkında gelen şikayetlerin görüntülendiği ve yönetildiği ekran.
      label: translate("resources.users.tabs.reports"),
      onSubmit: (values) => {
        console.log("complaints", values);
      },
      isVisible: true,
      groups: [
        {
          label: "Offers",
          isLabelVisible: true,
          fields: [
            {
              id: "id",
              label: "Id",
              type: "text",
              colSpan: 6,
            },
            {
              id: "reporterId",
              label: translate("resources.users.fields.reporterId"),
              type: "text",
              colSpan: 6,
              editable: false,
              defaultValue: record?.reporterId,
              placeholder: record?.reporterId,
              validationMessage: commonState.validationMessages?.reporterId,
            },
          ],
        },
      ],
    },
  ] as IFormTab[];

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

  return (
    <div className="w-full">
      {/* <LineChart
        dailyInteractions={[10, 20, 30, 40, 50, 60, 70]}
        dailyLabels={[
          "2021-01-01",
          "2021-02-01",
          "2021-03-01",
          "2021-04-01",
          "2021-05-01",
          "2021-06-01",
          "2021-07-01",
        ]}
        averageInteractionRatio={0.5}
        title="2021 Yılı Aylık Kullanıcı Sayısı"
        className="container-adjusted !w-1/2 "
      ></LineChart>
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

      <DynamicFormWithTabs
        formTabs={formTabs}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};
