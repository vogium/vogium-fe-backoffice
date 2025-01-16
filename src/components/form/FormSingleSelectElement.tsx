import React from "react";
import { IBaseFormElementProps, ISelectOption } from "../../types/IForm";
import FormLabelElement from "./FormLabelElement";
import Select from "react-select";
import { ValidationMessage } from "./ValidationMessage";

interface FormSingleSelectElementProps extends IBaseFormElementProps {
  options: ISelectOption[];
  placeholder?: string;
}

const FormSingleSelectElement: React.FC<FormSingleSelectElementProps> = ({
  id,
  label,
  colSpan,
  editable = true,
  value,
  onChange,
  options,
  placeholder,
  validationMessage,
}) => {
  return (
    <div className={`col-span-${colSpan} flex flex-col`}>
      <FormLabelElement id={id} label={label} />

      <Select
        id={id}
        isDisabled={!editable}
        isClearable
        value={options.find((o) => o.value === value)}
        onChange={(newValue) => {
          onChange(id, newValue?.value);
        }}
        options={options}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder={placeholder}
        styles={{
          //Todo bu stil tüm inputlara uygulanmalı genel olarak...
          control: (provided, state) => ({
            ...provided,
            cursor: "pointer",
            borderColor: state.isFocused ? "#7F3D5B" : "#E5E7EB",
            boxShadow: state.isFocused ? "0 0 0 1px #7F3D5B" : "none",
            "&:hover": {
              borderColor: "#7F3D5B",
            },
          }),
          option: (provided, state) => ({
            ...provided,
            cursor: "pointer",
            color: state.isSelected ? "#fff" : "#000",
            backgroundColor: state.isSelected ? "#7F3D5B" : "#fff",
            "&:hover": {
              backgroundColor: "#ab6885",
              color: "#fff",
            },
          }),
        }}
      />

      <ValidationMessage message={validationMessage} />
    </div>
  );
};

export default FormSingleSelectElement;
