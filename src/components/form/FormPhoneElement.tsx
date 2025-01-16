import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FormLabelElement from "./FormLabelElement";
import { ValidationMessage } from "./ValidationMessage";

interface FormPhoneElementProps {
  id: string;
  label: string;
  value?: string;
  onChange: (id: string, value: string) => void;
  editable?: boolean;
  colSpan?: number;
  validationMessage?: string;
}

export const FormPhoneElement: React.FC<FormPhoneElementProps> = ({
  id,
  label,
  value,
  onChange,
  editable = true,
  colSpan = 12,
  validationMessage,
}) => {
  return (
    <div className={`col-span-${colSpan} flex flex-col w-full`}>
      <FormLabelElement id={id} label={label} />
      <PhoneInput
        country={"tr"}
        value={value}
        onChange={(phone) => onChange(id, phone)}
        disabled={!editable}
        inputClass="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        containerClass="w-full"
        inputStyle={{ width: "100%" }}
      />
      <ValidationMessage message={validationMessage} />
    </div>
  );
};
