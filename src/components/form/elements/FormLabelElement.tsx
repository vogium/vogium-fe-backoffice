import React from "react";
import { IFormLabelElementProps } from "../../../types/IForm";

const FormLabelElement: React.FC<IFormLabelElementProps> = ({ id, label }) => {
  return (
    <label htmlFor={id} className="mb-1 text-sm font-semibold">
      {label}
    </label>
  );
};

export default FormLabelElement;
