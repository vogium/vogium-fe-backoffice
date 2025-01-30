import React, { useEffect } from "react";
import { getReportDescriptionOptions } from "../../../enums/report/report-description.enum";
import { getReportStatusOptions } from "../../../enums/report/report-status.enum";
import { getReportTitleOptions } from "../../../enums/report/report-title.enum";
import { getReportTypeOptions } from "../../../enums/report/report-types.enum";
import { IReport } from "../../../types/IReport";
import { IGroup } from "../../../types/IFormTabs";
import DynamicFormWithGroups from "../../../components/form/DynamicFormWithGroups";
import { useCommonStates } from "../../../hooks/useCommonStates";
import ButtonWithIcon from "../../../components/buttons/ButtonWithIcon";
import { useNotification, useTranslate, useUpdate } from "@refinedev/core";
import { API_ROUTES } from "../../../contants/apiRoutes";
import { NotificationsType } from "../../../enums/notifications/notifications-type.enum";
import { getRouteByField } from "../../../lib/routeByField";
import reportUpdateSchema from "../../../schemas/reports/report-update.schema";
import { resolveMutationPromises } from "../../../lib/requestPromiseResolver";
import { useFormUpdate } from "../../../hooks/useFormUpdate";

export default function UserComplaintTabView({
  complaint,
  setIsDetailsModalOpen,
}: {
  complaint: IReport;
  setIsDetailsModalOpen: (isOpen: boolean) => void;
}) {
  const { handleUpdateByFields } = useFormUpdate<IReport>();
  const translate = useTranslate();
  const { open } = useNotification();
  const {
    values,
    setOriginalData,
    handleFieldChange,
    setLoadingState,
    validateForm,
    dirtyValues,
    validationMessages,
  } = useCommonStates<IReport>();

  useEffect(() => {
    setOriginalData(complaint);
  }, [complaint, setOriginalData]);

  // TODO ayrı bir detay görüntüleme işlemi yapılacak ya da şikayete yönelik kullanıcı bilgileri getirilecek
  //todo vog bilgiside getirilebilir.. burada artık şikayet görüntülemeye karar vermek gerekiyor.
  // const { data: reporterUser } = useShow({
  //   resource: API_ROUTES.USERS.GET.BY_AUTH_ID,
  //   id: complaint.reporterId,
  // });

  const formGroups: IGroup[] = React.useMemo(
    () => [
      {
        label: "",
        isLabelVisible: false,
        fields: [
          {
            id: "reportedId",
            label: translate("resources.complaints.fields.reported"),
            type: "text",
            colSpan: 6,
            editable: false,
            defaultValue: complaint.id,
            validationMessage: validationMessages?.reporterId,
          },
          {
            id: "reportedId",
            label: translate("resources.complaints.fields.reporter"),
            type: "text",
            colSpan: 6,
            editable: false,
            defaultValue: complaint.id,
            validationMessage: validationMessages?.reportedId,
          },
          {
            id: "date",
            label: translate("resources.complaints.fields.date"),
            type: "text",
            colSpan: 6,
            editable: false,
            defaultValue: complaint.date,
            validationMessage: validationMessages?.date,
          },
          {
            id: "type",
            label: translate("resources.complaints.fields.type"),
            type: "select",
            colSpan: 6,
            options: getReportTypeOptions(),
            editable: true,
            isClearable: false,
            defaultValue: complaint.type,
            validationMessage: validationMessages?.type,
          },
          {
            id: "reportTitle",
            label: translate("resources.complaints.fields.reportTitle"),
            type: "select",
            colSpan: 6,
            isClearable: false,
            options: getReportTitleOptions(),
            defaultValue: 0,
            validationMessage: validationMessages?.reportTitle,
          },
          {
            id: "reportStatus",
            label: translate("resources.complaints.fields.reportStatus"),
            type: "select",
            colSpan: 6,
            options: getReportStatusOptions(),
            editable: true,
            isClearable: false,
            defaultValue: complaint.reportStatus,
            validationMessage: validationMessages?.reportStatus,
          },
          {
            id: "description",
            label: translate("resources.complaints.fields.reportDescription"),
            type: "select",
            colSpan: 12,
            options: getReportDescriptionOptions(),
            isClearable: false,
            defaultValue: complaint.reportDescription,
            validationMessage: validationMessages?.reportDescription,
          },

          {
            id: "reportNote",
            label: "Status",
            type: "textarea",
            colSpan: 12,
            editable: true,
            defaultValue: complaint.reportNote,
            validationMessage: validationMessages?.reportNote,
          },
        ],
      },
    ],
    [complaint, translate, validationMessages]
  );

  const { mutate } = useUpdate({
    resource: API_ROUTES.GATEWAY,
    id: "",
    mutationOptions: {
      onSuccess: () => {
        open?.({
          message: translate("notifications.generalSuccess", {
            resource: translate("resources.complaints.name"),
            action: translate("actions.updated"),
          }),
          type: NotificationsType.SUCCESS,
        });
      },
      onError: () => {
        open?.({
          message: translate("notifications.error"),
          type: NotificationsType.ERROR,
        });
      },
    },
  });

  /**
   * Handles the user profile update process.
   *
   * This method:
   * 1. Validates form data against userUpdateSchema
   * 2. If validation passes, creates API requests for each changed field
   * 3. Sends requests in parallel using Promise.all
   * 4. Manages loading state during the process
   */
  // const handleUpdate = async () => {
  //   setLoadingState(true);

  //   const validation = validateForm({
  //     body: dirtyValues,
  //     schema: reportUpdateSchema,
  //     errorCallBack: () => {
  //       open?.({
  //         message: translate("notifications.validationError"),
  //         type: NotificationsType.WARNING,
  //       });
  //       setLoadingState(false);
  //     },
  //   });

  //   if (validation.isValid) {
  //     if (dirtyValues && Object.keys(dirtyValues).length) {
  //       const promises = Object.keys(dirtyValues).map(async (key) => {
  //         const API_ROUTE_KEY = getRouteByField("REPORTS", "UPDATE", key);

  //         if (!API_ROUTE_KEY) {
  //           console.error("API_ROUTE_KEY is not found for key: ", key);
  //           return;
  //         }

  //         return mutate({
  //           values: {
  //             serviceKey: API_ROUTE_KEY,
  //             data: {
  //               [key]: dirtyValues[key as keyof IReport],
  //             },
  //           },
  //         });
  //       });

  //       // await Promise.all(promises);
  //       const result = await resolveMutationPromises({
  //         promises,
  //         setLoadingState,
  //         onSuccess: (result) => {
  //           console.log("result", result);
  //           open?.({
  //             message: translate("notifications.updateSuccess", {
  //               total: result.successCount,
  //             }),
  //             type: NotificationsType.SUCCESS,
  //           });
  //           setIsDetailsModalOpen(false);
  //         },
  //         onError: (result) => {
  //           open?.({
  //             message: translate("notifications.error", {
  //               failed: result.failedCount,
  //               total: result.totalCount,
  //             }),
  //             type: NotificationsType.ERROR,
  //           });
  //         },
  //       });
  //     } else {
  //       setIsDetailsModalOpen(false);
  //     }
  //     setLoadingState(false);
  //   }
  // };

  const handleUpdate = async () => {
    await handleUpdateByFields({
      dirtyValues,
      schema: reportUpdateSchema,
      resourceName: "REPORTS",
      operation: "UPDATE",
      setLoadingState,
      setIsDetailsModalOpen,
      validateForm,
      mutate,
      translate,
      open,
    });
  };

  return (
    <div>
      <ButtonWithIcon
        onClickAction={() => {
          setIsDetailsModalOpen(false);
        }}
        iconClassName="filter-brand"
        iconSrc="/icons/arrowBack.svg"
      ></ButtonWithIcon>
      <DynamicFormWithGroups
        groups={formGroups}
        formData={values}
        onSubmit={() => {
          handleUpdate();
        }}
        handleFieldChange={handleFieldChange}
        showButtonProgress={false}
        isButtonBlocked={false}
        className="shadow-none"
      />
    </div>
  );
}
