import React from "react";
import { IBaseFormElementProps } from "../../../types/IForm";
import FormLabelElement from "./FormLabelElement";

type FormCheckboxElementProps = IBaseFormElementProps;

const FormCheckboxElement: React.FC<FormCheckboxElementProps> = ({
  id,
  label,
  colSpan,
  editable = true,
  value,
  onChange,
}) => {
  return (
    <div className={`col-span-${colSpan} flex flex-col`}>
      <FormLabelElement id={id} label={label} />

      <input
        type="checkbox"
        id={id}
        checked={!!value}
        disabled={!editable}
        onChange={(e) => onChange(id, e.target.checked)}
        className="w-5 h-5"
      />
    </div>
  );
};

export default FormCheckboxElement;
