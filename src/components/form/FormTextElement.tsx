import React from "react";
import { IBaseFormElementProps } from "../../types/IForm";
import FormLabelElement from "./FormLabelElement";
import { ValidationMessage } from "./ValidationMessage";

interface FormTextElementProps extends IBaseFormElementProps {
  type?: "text" | "number" | "email";
  placeholder?: string;
}

const FormTextElement: React.FC<FormTextElementProps> = ({
  id,
  label,
  colSpan,
  editable = true,
  value,
  onChange,
  type = "text",
  placeholder,
  validationMessage,
}) => {
  return (
    <div className={`col-span-${colSpan} flex flex-col`}>
      <FormLabelElement id={id} label={label} />

      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={!editable}
        onChange={(e) => onChange(id, e.target.value)}
        className={
          "border rounded p-2 " + (validationMessage ? "danger-input" : "")
        }
      />

      <ValidationMessage message={validationMessage} />
    </div>
  );
};

export default FormTextElement;
