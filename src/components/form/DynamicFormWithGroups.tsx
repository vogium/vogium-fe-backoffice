import React, { useState } from "react";
import SuccessButton from "../buttons/SuccessButton";
import FormTextElement from "./FormTextElement";
import FormSingleSelectElement from "./FormSingleSelectElement";
import FormCheckboxElement from "./FormCheckboxElement";
import { IFormField } from "../../types/IForm";

import { TabPanel } from "../TabPanel";
import { useTranslate } from "@refinedev/core";
import { FormPhoneElement } from "./FormPhoneElement";
import FormDatePickerElement from "./FormDatePickerElement";
import formElementRenderer from "../../utils/FormElementRenderer";
import { IGroup } from "../../types/IFormTabs";

interface FormProps {
  groups: IGroup[];
  onSubmit: (values: Record<string, unknown>) => void;
  formData: Record<string, unknown>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  className?: string;
}

const DynamicFormWithGroups: React.FC<FormProps> = ({
  groups,
  formData,
  onSubmit,
  setFormData,
  className = "bg-white rounded-lg shadow-md my-5",
}) => {
  const translate = useTranslate();

  const handleChange = (id: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("Form Data", formData);
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    // <React.Fragment>
    <div className={"w-full " + className}>
      <form
        onSubmit={() => {
          //  handleSubmit(formData, userUpdateSchema);
          console.log("submitting form");
        }}
        className="grid grid-cols-12 gap-4 p-4"
      >
        {groups.map((group) => {
          return (
            <React.Fragment key={group.label}>
              {group.isLabelVisible && (
                <div className="col-span-12 mt-4">
                  <h3 className="text-lg font-semibold">{group.label}</h3>
                </div>
              )}
              {group.fields.map((field) => {
                return formElementRenderer({
                  field,
                  formData,
                  handleChange,
                });
              })}
            </React.Fragment>
          );
        })}

        <div className="col-span-12 mt-4 grid grid-cols-12 gap-4 p-4">
          <SuccessButton
            title={translate("actions.save")}
            onClickAction={(e: React.FormEvent) => {
              handleSubmit(e);
            }}
            parentClassName="col-span-2 col-start-11"
          />
        </div>
      </form>
    </div>
  );
};

export default DynamicFormWithGroups;
