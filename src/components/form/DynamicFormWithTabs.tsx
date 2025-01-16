import React, { useState } from "react";
import SuccessButton from "../buttons/SuccessButton";
import FormTextElement from "./FormTextElement";
import FormSingleSelectElement from "./FormSingleSelectElement";
import FormCheckboxElement from "./FormCheckboxElement";
import { IFormField } from "../../types/IForm";
import { IFormTab } from "../../types/IFormTabs";
import { TabPanel } from "../TabPanel";
import { useTranslate } from "@refinedev/core";
import { FormPhoneElement } from "./FormPhoneElement";
import FormDatePickerElement from "./FormDatePickerElement";

interface FormProps {
  // fields: IFormField[];
  formTabs: IFormTab[];
  // onSubmit: (values: Record<string, unknown>) => void;
  formData: Record<string, unknown>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  className?: string;
}

const DynamicFormWithTabs: React.FC<FormProps> = ({
  formTabs,
  formData,
  setFormData,
  className = "bg-white rounded-lg shadow-md my-5",
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const translate = useTranslate();

  const handleChange = (id: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("Form Data", formData);
    e.preventDefault();
    // onSubmit(formData);
    console.log("Form Data", formData);
    formTabs[activeTab].onSubmit?.(formData);
  };

  const renderFormElement = (field: IFormField) => {
    if (field.render) {
      return (
        <div key={field.id} className={`col-span-${field.colSpan}`}>
          {field.render()}
        </div>
      );
    }

    const commonProps = {
      id: field.id,
      label: field.label,
      colSpan: field.colSpan,
      editable: field.editable !== false,
      value:
        formData[field.id] !== undefined
          ? formData[field.id]
          : field.defaultValue || "",
      onChange: handleChange,
      validationMessage: field.validationMessage,
    };

    switch (field.type) {
      case "select":
        return (
          <FormSingleSelectElement
            key={field.id}
            {...commonProps}
            options={field.options || []}
            placeholder={field.placeholder}
          />
        );
      case "checkbox":
        return <FormCheckboxElement key={field.id} {...commonProps} />;
      case "text":
      case "number":
        return (
          <FormTextElement
            key={field.id}
            {...commonProps}
            type={field.type}
            placeholder={field.placeholder}
          />
        );
      case "email":
        return (
          <FormTextElement
            key={field.id}
            {...commonProps}
            type="email"
            placeholder={field.placeholder || "Enter email address"}
          />
        );
      case "phone":
        return (
          <FormPhoneElement
            key={field.id}
            {...commonProps}
            value={
              formData[field.id] !== undefined
                ? String(formData[field.id]) // Convert to string
                : undefined
            }
          />
        );
      case "datePicker":
        return (
          <FormDatePickerElement
            key={field.id}
            {...commonProps}
            value={
              formData[field.id] !== undefined
                ? String(formData[field.id])
                : undefined
            }
            maxDate={field.maxDate}
          />
        );
      default:
        console.error("Unsupported field type: ", field.type);
        return (
          <span className="text-red-600 font-bold">
            Unsupported field type: {field.type}
          </span>
        );
    }
  };

  return (
    <div className={"w-full " + className}>
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {formTabs.map((tab, index) => {
            if (tab.isVisible === false) return null;
            return (
              <button
                key={tab.id}
                className={`py-4 px-6 font-medium text-sm animation-smooth-fast ${
                  activeTab === index
                    ? "border-b-2 border-brand text-brand"
                    : "text-brand/50 hover:text-brand/50"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Panels */}
      {formTabs.map((tab, index) => {
        if (tab.isVisible === false) return null;
        return (
          <React.Fragment key={tab.id}>
            <TabPanel value={activeTab} index={index}>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-12 gap-4 p-4"
              >
                {/* {tab.fields.map(renderFormElement)} */}
                {tab.groups.map((group) => (
                  <React.Fragment key={group.label}>
                    {group.isLabelVisible && (
                      <div className="col-span-12 mt-4">
                        <h3 className="text-lg font-semibold">{group.label}</h3>
                      </div>
                    )}
                    {group.fields.map(renderFormElement)}
                  </React.Fragment>
                ))}
              </form>
            </TabPanel>

            {tab.onSubmit && activeTab === index && (
              <div className="col-span-12 mt-4 grid grid-cols-12 gap-4 p-4">
                <SuccessButton
                  title={translate("actions.save")}
                  onClickAction={(e: React.FormEvent) => {
                    console.log("clicked sabe", formData);
                    handleSubmit(e);
                    // tab.onSubmit(formData);
                  }}
                  parentClassName="col-span-2 col-start-11"
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DynamicFormWithTabs;
