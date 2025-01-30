import React from "react";
import SuccessButton from "../buttons/SuccessButton";
import { BaseRecord, useTranslate } from "@refinedev/core";
import formElementRenderer from "../../utils/FormElementRenderer";
import { IGroup } from "../../types/IFormTabs";

interface FormProps<T extends BaseRecord> {
  groups: IGroup[];
  onSubmit: (values: T) => void;
  formData: T | undefined;
  handleFieldChange: (id: keyof T, value: unknown) => void;
  className?: string;
  isButtonBlocked?: boolean;
  showButtonProgress?: boolean;
}

const DynamicFormWithGroups = <T extends BaseRecord>({
  groups,
  formData,
  onSubmit,
  handleFieldChange,
  className = "",
  isButtonBlocked = false,
  showButtonProgress = false,
}: FormProps<T>) => {
  const translate = useTranslate();

  if (!formData) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={"w-full bg-white rounded-lg shadow-md my-5 " + className}>
      <form className="grid grid-cols-12 gap-4">
        {groups.map((group) => {
          return (
            <React.Fragment key={group.label}>
              {group.isLabelVisible && (
                <div className="col-span-12 mt-4">
                  <h3 className="text-lg font-semibold">{group.label}</h3>
                </div>
              )}
              {group.fields.map((field, index) => (
                <React.Fragment key={index}>
                  {formElementRenderer({
                    field,
                    formData,
                    handleFieldChange,
                  })}
                </React.Fragment>
              ))}
            </React.Fragment>
          );
        })}

        <div className="col-span-12 mt-4 grid grid-cols-12 gap-4">
          <SuccessButton
            title={translate("actions.save")}
            onClickAction={(e: React.FormEvent) => {
              handleSubmit(e);
            }}
            parentClassName="col-span-2 col-start-11"
            isBlockState={isButtonBlocked}
            showProgress={showButtonProgress}
          />
        </div>
      </form>
    </div>
  );
};

export default DynamicFormWithGroups;
