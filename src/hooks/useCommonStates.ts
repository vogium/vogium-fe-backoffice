// src/hooks/useCommonStates.js
import { useEffect, useState } from "react";
import * as yup from "yup";

export function useCommonStates<TFormValues>({
  formValues,
}: {
  formValues?: TFormValues;
}) {
  const [listOptions, setListOptions] = useState<Record<string, unknown>[]>([]);
  const [selectedListOption, setSelectedListOption] = useState<number | null>(
    null
  );
  const [validationMessages, setValidationMessages] = useState<Record<
    string,
    string
  > | null>(null);
  const [values, setValues] = useState<TFormValues | null>(null);
  const [originalValues, setOriginalValues] = useState(
    JSON.parse(JSON.stringify(formValues || {}))
  );
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const settingDirty =
      JSON.stringify(values) !== JSON.stringify(originalValues);
    setIsDirty(settingDirty);
  }, [values, originalValues]);

  const setOriginalData = ({ fetchedData }: any) => {
    setOriginalValues(JSON.parse(JSON.stringify(fetchedData)));
  };

  //schema is yup schema
  const validateForm = ({
    schema,
    body,
    successCallback,
  }: {
    schema: yup.ObjectSchema<any>;
    body: any;
    successCallback: () => void;
  }) => {
    try {
      schema.validateSync(body, { abortEarly: false });
      successCallback();
      setValidationMessages({});
      return { isValid: true, errors: {} };
    } catch (error: any) {
      const errors: any = {};

      // error.inner'da bulunan her hata için işlem yapıyoruz
      error.inner.forEach((err: any) => {
        // Şemada olmayan alanlar için özel hata mesajı
        if (err.path === "") {
          const unknownFields = err.errors[0].match(
            /this field has unspecified keys: (.*)/
          );
          if (unknownFields) {
            const fields = unknownFields[1].split(", ");
            fields.forEach((field: any) => {
              errors[
                field
              ] = `Field "${field}" is not allowed, value: ${body[field]}`;
            });
          }
        } else {
          // Şemada tanımlı alanlar için standart hata mesajı
          errors[err.path] = err.message;
        }
      });

      console.log("validation errors :>> ", errors);
      setValidationMessages(errors);

      return { isValid: false, errors };
    }
  };

  return {
    validationMessages,
    setValidationMessages,
    listOptions,
    setListOptions,
    selectedListOption,
    setSelectedListOption,
    values,
    setValues,
    originalValues,
    setOriginalValues,
    isDirty,
    setIsDirty,
    setOriginalData,
    validateForm,
  };
}
