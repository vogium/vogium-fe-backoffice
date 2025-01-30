import React from "react";
import { IBaseFormElementProps } from "../../../types/IForm";
import FormLabelElement from "./FormLabelElement";
import { ValidationMessage } from "../ValidationMessage";

interface FormTextElementProps extends IBaseFormElementProps {
  placeholder?: string;
}

const FormTextAreaElement: React.FC<FormTextElementProps> = ({
  id,
  label,
  colSpan,
  editable = true,
  value,
  onChange,
  placeholder,
  validationMessage,
}) => {
  return (
    <div className={`col-span-${colSpan} flex flex-col`}>
      <FormLabelElement id={id} label={label} />

      <textarea
        id={id}
        value={value as string}
        placeholder={placeholder}
        disabled={!editable}
        onChange={(e) => onChange(id, e.target.value)}
        className={"" + (validationMessage ? "danger-input" : "")}
      />

      <ValidationMessage message={validationMessage} />
    </div>
  );
};

export default FormTextAreaElement;
