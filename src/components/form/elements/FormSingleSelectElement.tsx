import React, { useMemo } from "react";
import { IBaseFormElementProps, ISelectOption } from "../../../types/IForm";
import FormLabelElement from "./FormLabelElement";
import Select from "react-select";
import { ValidationMessage } from "../ValidationMessage";
import { useTranslate } from "@refinedev/core";

interface FormSingleSelectElementProps extends IBaseFormElementProps {
  options: ISelectOption[];
  placeholder?: string;
  isClearable?: boolean;
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
  isClearable = true,
}) => {
  const translate = useTranslate();
  const translatedOptions = options.map((o) => ({
    value: o.value,
    label: translate(o.label),
  }));

  const transformedValue = useMemo(() => {
    const transformValue = (value: unknown) => {
      //passed value is string ang might be empty string
      if (typeof value === "string") {
        //convert to number
        if (value === "") {
          return 0;
        }

        if (isNaN(+value)) {
          return 0;
        }

        return +value;
      }
      //passed value is number and might be 0
      if (typeof value === "number") {
        return value;
      }
    };
    return transformValue(value);
  }, [value]);

  return (
    <div className={`col-span-${colSpan} flex flex-col`}>
      <FormLabelElement id={id} label={label} />

      <Select
        id={id}
        isDisabled={!editable}
        isClearable={isClearable}
        value={translatedOptions.find((o) => {
          return o.value === transformedValue;
        })}
        onChange={(newValue) => {
          onChange(id, newValue?.value);
        }}
        options={translatedOptions}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder={placeholder}
        styles={{
          valueContainer: (provided) => ({
            ...provided,
            // padding: "2px 8px",
            padding: "1px 10px",
          }),
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
            "&:active": {
              backgroundColor: "#7F3D5B",
              color: "#fff",
            },
          }),
          input: (provided) => ({
            ...provided,
            border: "none !important",
            boxShadow: "none !important",
            outline: "none !important",
            padding: "0 !important",
            margin: "0 !important",
            "&:hover": {
              border: "none !important",
            },
            "&:focus": {
              border: "none !important",
              boxShadow: "none !important",
            },
          }),
        }}
      />

      <ValidationMessage message={validationMessage} />
    </div>
  );
};

export default FormSingleSelectElement;
