import { BaseRecord } from "@refinedev/core";
import * as yup from "yup";
import { IValidationErrors } from "../types/IResponse";

export const validateFormAgainstSchema = ({
  body,
  schema,
  setValidationMessages,
  successCallback,
  errorCallBack,
}: {
  body: any;
  schema: yup.ObjectSchema<any>;
  setValidationMessages: React.Dispatch<React.SetStateAction<BaseRecord | null> | null>;
  successCallback?: () => void;
  errorCallBack?: (errors: any) => void;
}) => {
  try {
    schema.validateSync(body, { abortEarly: false });
    successCallback && successCallback();
    setValidationMessages({});
    setValidationMessages(null);
    return { isValid: true, errors: {} };
  } catch (error: any) {
    const errors: IValidationErrors = {};

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

    console.error("Validation errors: ", errors);

    errorCallBack && errorCallBack(errors);
    setValidationMessages(errors);

    return { isValid: false, errors };
  }
};
