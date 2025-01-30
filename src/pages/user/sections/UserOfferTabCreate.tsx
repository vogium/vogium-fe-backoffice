import React, { useEffect, useMemo } from "react";
import { useCommonStates } from "../../../hooks/useCommonStates";
import { useNotification, useTranslate, useUpdate } from "@refinedev/core";
import { API_ROUTES } from "../../../contants/apiRoutes";
import { NotificationsType } from "../../../enums/notifications/notifications-type.enum";
import ButtonWithIcon from "../../../components/buttons/ButtonWithIcon";
import DynamicFormWithGroups from "../../../components/form/DynamicFormWithGroups";
import { IGroup } from "../../../types/IFormTabs";
import { IOffer } from "../../../types/IOffer";
import { getOfferStatusOptions } from "../../../enums/offers/offers-status.enum";
import offerCreateSchema from "../../../schemas/offers/offer-create.schema";
import {
  DatePickerField,
  DocumentField,
  NumberField,
  SelectField,
  TextareaField,
  TextField,
} from "../../../lib/formFields";

interface UserOfferTabCreateProps {
  setIsCreateModalOpen: (isOpen: boolean) => void;
}

export default function UserOfferTabCreate({
  setIsCreateModalOpen,
}: UserOfferTabCreateProps) {
  const translate = useTranslate();
  const { open } = useNotification();
  const {
    values,
    handleFieldChange,
    setLoadingState,
    validateForm,
    validationMessages,
    generateInitialValues,
  } = useCommonStates<IOffer>();

  const formGroups: IGroup[] = React.useMemo(
    () => [
      {
        label: "",
        isLabelVisible: false,
        fields: [
          new TextField({
            id: "title",
            label: translate("resources.offers.fields.title"),
            colSpan: 6,
            editable: true,
            defaultValue: values?.title,
            validationMessage: validationMessages?.title,
          }),
          new SelectField({
            id: "status",
            label: translate("resources.offers.fields.status"),
            options: getOfferStatusOptions(),
            colSpan: 6,
            editable: true,
            isClearable: false,
            defaultValue: values?.status,
            validationMessage: validationMessages?.status,
          }),
          new NumberField({
            id: "amount",
            label: translate("resources.offers.fields.amount"),
            colSpan: 6,
            editable: true,
            defaultValue: values?.amount,
            validationMessage: validationMessages?.amount,
            min: 0,
          }),
          new TextareaField({
            id: "description",
            label: translate("resources.offers.fields.description"),
            colSpan: 6,
            editable: true,
            defaultValue: values?.description,
            validationMessage: validationMessages?.description,
          }),
          new DatePickerField({
            id: "startDate",
            label: translate("resources.offers.fields.startDate"),
            colSpan: 6,
            editable: true,
            defaultValue: values?.startDate,
            validationMessage: validationMessages?.startDate,
            maxDate: values?.endDate,
          }),
          new DatePickerField({
            id: "endDate",
            label: translate("resources.offers.fields.endDate"),
            colSpan: 6,
            editable: true,
            defaultValue: values?.endDate,
            validationMessage: validationMessages?.endDate,
            minDate: values?.startDate,
          }),
          new DocumentField({
            id: "documentUrl",
            label: translate("resources.offers.fields.documentUrl"),
            isMulti: false,
            accept: ".pdf,.doc,.docx",
            maxSize: 5,
            colSpan: 6,
            editable: true,
            defaultValue: values?.documentUrl,
            validationMessage: validationMessages?.documentUrl,
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

  const handleCreate = async (values: IOffer) => {
    setLoadingState(true);

    const validation = validateForm({
      body: values,
      schema: offerCreateSchema,
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
