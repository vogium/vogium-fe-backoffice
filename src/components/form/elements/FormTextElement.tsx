import React from "react";
import { IBaseFormElementProps } from "../../../types/IForm";
import FormLabelElement from "./FormLabelElement";
import { ValidationMessage } from "../ValidationMessage";

interface FormTextElementProps extends IBaseFormElementProps {
  type?: "text" | "number" | "email";
  placeholder?: string;
  min?: number;
  max?: number;
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
  min,
  max,
}) => {
  return (
    <div className={`col-span-${colSpan} flex flex-col`}>
      <FormLabelElement id={id} label={label} />

      <input
        type={type}
        id={id}
        value={type === "number" ? (value as number) : (value as string)}
        placeholder={placeholder}
        disabled={!editable}
        onChange={(e) => {
          onChange(id, type === "number" ? +e.target.value : e.target.value);
        }}
        onInput={(e) => {
          if (type === "number") {
            const value = +e.currentTarget.value;
            if (min !== undefined && value < min) {
              e.currentTarget.value = min.toString();
            }
            if (max !== undefined && value > max) {
              e.currentTarget.value = max.toString();
            }
          }
        }}
        className={"" + (validationMessage ? "danger-input" : "")}
      />

      <ValidationMessage message={validationMessage} />
    </div>
  );
};

export default FormTextElement;
