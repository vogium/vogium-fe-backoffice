import React from "react";
import { useCommonStates } from "../../../hooks/useCommonStates";
import { useNotification, useTranslate, useUpdate } from "@refinedev/core";
import { API_ROUTES } from "../../../contants/apiRoutes";
import { NotificationsType } from "../../../enums/notifications/notifications-type.enum";
import ButtonWithIcon from "../../../components/buttons/ButtonWithIcon";
import DynamicFormWithGroups from "../../../components/form/DynamicFormWithGroups";
import { IGroup } from "../../../types/IFormTabs";
import { IContract } from "../../../types/IContract";
import {
  DatePickerField,
  DocumentField,
  SelectField,
  TextField,
} from "../../../lib/formFields";
import { getContractTypeOptions } from "../../../enums/contracts/contract-type.enum";
import { contractCreateSchema } from "../../../schemas/contracts/contract-create-schema";

interface UserContractTabCreateProps {
  setIsCreateModalOpen: (isOpen: boolean) => void;
}

export default function UserContractTabCreate({
  setIsCreateModalOpen,
}: UserContractTabCreateProps) {
  const translate = useTranslate();
  const { open } = useNotification();
  const {
    values,
    handleFieldChange,
    setLoadingState,
    validateForm,
    validationMessages,
    generateInitialValues,
  } = useCommonStates<IContract>();

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
            defaultValue: values?.type,
            validationMessage: validationMessages?.type,
          }),
          new TextField({
            id: "description",
            label: translate("resources.contracts.fields.description"),
            colSpan: 6,
            editable: true,
            defaultValue: values?.description,
            validationMessage: validationMessages?.description,
          }),
          new DatePickerField({
            id: "startDate",
            label: translate("resources.contracts.fields.startDate"),
            colSpan: 6,
            editable: true,
            defaultValue: values?.startDate,
            validationMessage: validationMessages?.startDate,
            minDate: new Date().toISOString(),
            maxDate: values?.endDate,
          }),
          new DatePickerField({
            id: "endDate",
            label: translate("resources.contracts.fields.endDate"),
            colSpan: 6,
            editable: true,
            defaultValue: values?.endDate,
            validationMessage: validationMessages?.endDate,
            minDate: values?.startDate,
          }),
          new DocumentField({
            id: "documentIds",
            label: translate("resources.contracts.fields.documentIds"),
            isMulti: true,
            accept: ".pdf,.doc,.docx",
            maxSize: 5,
            editable: true,
            defaultValue: values?.documentIds,
            validationMessage: validationMessages?.documentIds,
          }),
        ],
      },
    ],
    [values, translate, validationMessages]
  );

  if (!values) generateInitialValues(formGroups);

  const { mutate } = useUpdate({
    resource: API_ROUTES.GATEWAY,
    id: "",
    mutationOptions: {
      onSuccess: () => {
        open?.({
          message: translate("notifications.generalSuccess", {
            resource: translate("resources.offers.name"),
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

  const handleCreate = async (values: IContract) => {
    setLoadingState(true);

    const validation = validateForm({
      body: values,
      schema: contractCreateSchema,
      errorCallBack: () => {
        open?.({
          message: translate("notifications.validationError"),
          type: NotificationsType.WARNING,
        });
      },
    });

    if (validation.isValid) {
      setLoadingState(true);
      mutate({
        values: values,
      });
    }

    setLoadingState(false);
  };

  return (
    <div>
      <ButtonWithIcon
        onClickAction={() => {
          setIsCreateModalOpen(false);
        }}
        iconClassName="filter-brand"
        iconSrc="/icons/arrowBack.svg"
      />
      <DynamicFormWithGroups
        groups={formGroups}
        formData={values}
        onSubmit={handleCreate}
        handleFieldChange={handleFieldChange}
        showButtonProgress={false}
        isButtonBlocked={false}
        className="shadow-none"
      />
    </div>
  );
}
