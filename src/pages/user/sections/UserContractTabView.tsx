import React, { useEffect } from "react";
import { getReportDescriptionOptions } from "../../../enums/report/report-description.enum";
import { getReportStatusOptions } from "../../../enums/report/report-status.enum";
import { getReportTitleOptions } from "../../../enums/report/report-title.enum";
import { getReportTypeOptions } from "../../../enums/report/report-types.enum";
import { IContract } from "../../../types/IContract";
import { IGroup } from "../../../types/IFormTabs";
import DynamicFormWithGroups from "../../../components/form/DynamicFormWithGroups";
import { useCommonStates } from "../../../hooks/useCommonStates";
import ButtonWithIcon from "../../../components/buttons/ButtonWithIcon";
import { useNotification, useTranslate, useUpdate } from "@refinedev/core";
import { API_ROUTES } from "../../../contants/apiRoutes";
import { NotificationsType } from "../../../enums/notifications/notifications-type.enum";
import reportUpdateSchema from "../../../schemas/reports/report-update.schema";
import { useFormUpdate } from "../../../hooks/useFormUpdate";
import {
  DatePickerField,
  DocumentField,
  SelectField,
  TextareaField,
} from "../../../lib/formFields";
import { getContractTypeOptions } from "../../../enums/contracts/contract-type.enum";
import {
  getContractStatusOption,
  getContractStatusOptions,
} from "../../../enums/contracts/contract-status.enum";

export default function UserContractTabView({
  contract,
  setIsDetailsModalOpen,
}: {
  contract: IContract;
  setIsDetailsModalOpen: (isOpen: boolean) => void;
}) {
  const { handleUpdateByFields } = useFormUpdate<IContract>();
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
  } = useCommonStates<IContract>();

  useEffect(() => {
    setOriginalData(contract);
  }, [contract, setOriginalData]);

  const formGroups: IGroup[] = React.useMemo(
    () => [
      {
        label: "",
        isLabelVisible: false,
        fields: [
          new SelectField({
            id: "type",
            label: translate("resources.contracts.fields.type"),
            options: getContractTypeOptions(),
            colSpan: 6,
            editable: true,
            defaultValue: contract?.type,
            validationMessage: validationMessages?.type,
          }),
          new TextareaField({
            id: "description",
            label: translate("resources.contracts.fields.description"),
            colSpan: 6,
            editable: true,
            defaultValue: contract?.description,
            validationMessage: validationMessages?.description,
          }),
          new DatePickerField({
            id: "date",
            label: translate("resources.contracts.fields.date"),
            colSpan: 6,
            editable: false,
            defaultValue: contract?.date,
            validationMessage: validationMessages?.date,
          }),
          new SelectField({
            id: "status",
            label: translate("resources.contracts.fields.status"),
            options: getContractStatusOptions(),
            colSpan: 6,
            editable: true,
            defaultValue: contract?.status,
            validationMessage: validationMessages?.status,
          }),
          new DocumentField({
            id: "documentIds",
            label: translate("resources.contracts.fields.documents"),
            colSpan: 6,
            editable: true,
            defaultValue: contract?.documentIds,
            validationMessage: validationMessages?.documentIds,
          }),
        ],
      },
    ],
    [contract, translate, validationMessages]
  );

  const { mutate } = useUpdate({
    resource: API_ROUTES.GATEWAY,
    id: "",
    mutationOptions: {
      onSuccess: () => {
        open?.({
          message: translate("notifications.generalSuccess", {
            resource: translate("resources.contracts.name"),
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

  const handleUpdate = async () => {
    await handleUpdateByFields({
      dirtyValues,
      schema: reportUpdateSchema,
      resourceName: "CONTRACTS",
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
