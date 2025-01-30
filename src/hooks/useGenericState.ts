import { BaseRecord } from "@refinedev/core";
import React from "react";

//Todo silinecek.. yerine useCommonStates kullanılacak..
export function useGenericState<
  IClickedRow extends BaseRecord,
  IFormData = FormData
>() {
  const [isWarningModalOpen, setIsWarningModalOpen] =
    React.useState<boolean>(false);
  const [isShowModalOpen, setIsShowModalOpen] = React.useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] =
    React.useState<boolean>(false);
  //todo validation type yok..
  const [validationErrors, setValidationErrors] = React.useState({});

  const [clickedRow, setClickedRow] = React.useState<IClickedRow | null>(null);
  const [formData, setFormData] = React.useState<IFormData | null>(null);

  const handleFormValueChange = (key: string, value: any) => {
    setFormData((prev): IFormData => {
      if (!prev) {
        return {
          [key]: value,
        } as IFormData;
      }

      return {
        ...prev,
        [key]: value,
      };
    });
  };

  return {
    isWarningModalOpen,
    setIsWarningModalOpen,
    isShowModalOpen,
    setIsShowModalOpen,
    isCreateModalOpen,
    setIsCreateModalOpen,
    validationErrors,
    setValidationErrors,
    clickedRow,
    setClickedRow,
    formData,
    setFormData,
    handleFormValueChange,
  };
}
