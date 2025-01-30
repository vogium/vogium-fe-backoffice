// src/hooks/useCommonStates.js
import { BaseRecord } from "@refinedev/core";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { validateFormAgainstSchema } from "../lib/formValidator";
import { IGroup } from "../types/IFormTabs";

export function useCommonStates<TFormValues extends BaseRecord>() {
  const [listOptions, setListOptions] = useState<BaseRecord[]>([]);
  const [selectedListOption, setSelectedListOption] = useState<number | null>(
    null
  );
  const [validationMessages, setValidationMessages] = useState<Record<
    string,
    string
  > | null>(null);
  const [values, setValues] = useState<TFormValues>();
  const [originalValues, setOriginalValues] = useState<TFormValues>();
  const [isDirty, setIsDirty] = useState(false);
  const [dirtyValues, setDirtyValues] = useState<TFormValues>();
  const [loadingState, setLoadingState] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const settingDirty =
      JSON.stringify(values) !== JSON.stringify(originalValues);
    setIsDirty(settingDirty);
  }, [values, originalValues]);

  const setOriginalData = React.useCallback((fetchedData: TFormValues) => {
    if (!fetchedData) {
      return;
    }
    setOriginalValues(JSON.parse(JSON.stringify(fetchedData)));
    setValues(JSON.parse(JSON.stringify(fetchedData)));
    setDirtyValues(undefined);
  }, []);

  //schema is yup schema
  const validateForm = ({
    body = values,
    schema,
    successCallback,
    errorCallBack,
  }: {
    body: any;
    schema: yup.ObjectSchema<any>;
    successCallback?: () => void;
    errorCallBack?: (errors: any) => void;
  }) => {
    return validateFormAgainstSchema({
      body,
      schema,
      successCallback,
      setValidationMessages,
      errorCallBack,
    });
  };

  const handleFieldChange = (id: keyof TFormValues, value: unknown) => {
    setValues((prev) => ({ ...prev, [id]: value } as TFormValues));

    handleDirtyFieldChange(id, value);
  };

  const handleDirtyFieldChange = (id: keyof TFormValues, value: unknown) => {
    //check if it is same with original value
    if (!originalValues) return;
    const isDirty =
      JSON.stringify(originalValues[id]) !== JSON.stringify(value);

    setDirtyValues((prev) => {
      if (isDirty) {
        // Add or update field if different from original
        return { ...prev, [id]: value } as TFormValues;
      } else {
        // Remove field if same as original
        const newDirtyValues = { ...prev };
        delete (newDirtyValues as any)[id];
        return Object.keys(newDirtyValues).length
          ? (newDirtyValues as TFormValues)
          : undefined;
      }
    });
  };

  const generateInitialValues = (groups: IGroup[]) => {
    const initialValues: Record<string, any> = {};

    groups.forEach((group) => {
      group.fields.forEach((field) => {
        switch (field.type) {
          case "text":
          case "textarea":
          case "email":
            initialValues[field.id] = "";
            break;
          case "number":
            initialValues[field.id] = 0;
            break;
          case "select":
            initialValues[field.id] = field.isClearable ? null : "";
            break;
          case "checkbox":
            initialValues[field.id] = false;
            break;
          case "document":
            initialValues[field.id] = field.isMulti ? [] : null;
            break;
          case "datePicker":
            initialValues[field.id] = null;
            break;
          default:
            initialValues[field.id] = null;
        }
      });
    });

    setValues(initialValues as TFormValues);

    return initialValues;
  };

  return {
    loadingState,
    setLoadingState,
    validationMessages,
    setValidationMessages,
    listOptions,
    setListOptions,
    selectedListOption,
    setSelectedListOption,
    values,
    setValues,
    originalValues,
    handleFieldChange,
    // setOriginalValues,
    isDirty,
    setIsDirty,
    setOriginalData,
    validateForm,
    dirtyValues,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    generateInitialValues,
  };
}
