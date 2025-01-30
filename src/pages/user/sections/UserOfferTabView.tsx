import React, { useEffect } from "react";
import { useCommonStates } from "../../../hooks/useCommonStates";
import { useFormUpdate } from "../../../hooks/useFormUpdate";
import { useNotification, useTranslate, useUpdate } from "@refinedev/core";
import { API_ROUTES } from "../../../contants/apiRoutes";
import { NotificationsType } from "../../../enums/notifications/notifications-type.enum";
import ButtonWithIcon from "../../../components/buttons/ButtonWithIcon";
import DynamicFormWithGroups from "../../../components/form/DynamicFormWithGroups";
import { IGroup } from "../../../types/IFormTabs";
import { IOffer } from "../../../types/IOffer";
import offerUpdateSchema from "../../../schemas/offers/offer-update.schema";
import { getOfferStatusOptions } from "../../../enums/offers/offers-status.enum";

interface UserOfferTabViewProps {
  offer: IOffer;
  setIsDetailsModalOpen: (isOpen: boolean) => void;
}

export default function UserOfferTabView({
  offer,
  setIsDetailsModalOpen,
}: UserOfferTabViewProps) {
  const { handleUpdateByFields } = useFormUpdate<IOffer>();
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
  } = useCommonStates<IOffer>();

  useEffect(() => {
    setOriginalData(offer);
  }, [offer, setOriginalData]);

  const formGroups: IGroup[] = React.useMemo(
    () => [
      {
        label: "",
        isLabelVisible: false,
        fields: [
          {
            id: "title",
            label: translate("resources.offers.fields.title"),
            type: "text",
            colSpan: 6,
            editable: true,
            defaultValue: offer.title,
            validationMessage: validationMessages?.title,
          },
          {
            id: "status",
            label: translate("resources.offers.fields.status"),
            type: "select",
            options: getOfferStatusOptions(),
            colSpan: 6,
            editable: true,
            isClearable: false,
            defaultValue: offer.status,
            validationMessage: validationMessages?.status,
          },
          {
            id: "amount",
            label: translate("resources.offers.fields.amount"),
            type: "number",
            colSpan: 6,
            editable: true,
            defaultValue: offer.amount,
            validationMessage: validationMessages?.amount,
          },
          {
            id: "description",
            label: translate("resources.offers.fields.description"),
            type: "textarea",
            colSpan: 6,
            editable: true,
            defaultValue: offer.description,
            validationMessage: validationMessages?.description,
          },
          {
            id: "startDate",
            label: translate("resources.offers.fields.startDate"),
            type: "datePicker",
            colSpan: 6,
            editable: true,
            defaultValue: offer.startDate,
            validationMessage: validationMessages?.startDate,
          },
          {
            id: "endDate",
            label: translate("resources.offers.fields.endDate"),
            type: "datePicker",
            colSpan: 6,
            editable: true,
            defaultValue: offer.endDate,
            validationMessage: validationMessages?.endDate,
          },
          {
            id: "documentUrl",
            label: translate("resources.offers.fields.documentUrl"),
            type: "document",
            isMulti: false,
            accept: ".pdf,.doc,.docx",
            maxSize: 5,
            colSpan: 6,
            editable: true,
            defaultValue: offer.documentUrl,
            validationMessage: validationMessages?.documentUrl,
          },
        ],
      },
    ],
    [offer, translate, validationMessages]
  );

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

  const handleUpdate = async () => {
    await handleUpdateByFields({
      dirtyValues,
      schema: offerUpdateSchema,
      resourceName: "OFFERS",
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
      />
      <DynamicFormWithGroups
        groups={formGroups}
        formData={values}
        onSubmit={handleUpdate}
        handleFieldChange={handleFieldChange}
        showButtonProgress={false}
        isButtonBlocked={false}
        className="shadow-none"
      />
    </div>
  );
}
