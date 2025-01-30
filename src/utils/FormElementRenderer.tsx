import { BaseRecord } from "@refinedev/core";
import FormCheckboxElement from "../components/form/elements/FormCheckboxElement";
import FormDatePickerElement from "../components/form/elements/FormDatePickerElement";
import { FormPhoneElement } from "../components/form/elements/FormPhoneElement";
import FormSingleSelectElement from "../components/form/elements/FormSingleSelectElement";
import FormTextElement from "../components/form/elements/FormTextElement";
import { IFormField } from "../types/IForm";
import FormTextAreaElement from "../components/form/elements/FormTextAreaElement";
import FormDocumentElement from "../components/form/elements/FormDocumentElement";

interface IFormElementRendererProps {
  field: IFormField;
  formData: BaseRecord;
  handleFieldChange: (id: string, value: unknown) => void;
}

const formElementRenderer = ({
  field,
  formData,
  handleFieldChange,
}: IFormElementRendererProps) => {
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
    onChange: handleFieldChange,
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
          isClearable={field.isClearable}
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
          min={field.min}
          max={field.max}
        />
      );
    case "textarea":
      return (
        <FormTextAreaElement
          key={field.id}
          {...commonProps}
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
    case "document":
      return (
        <FormDocumentElement
          key={field.id}
          {...commonProps}
          value={
            formData[field.id] !== undefined
              ? String(formData[field.id]) // Convert to string
              : undefined
          }
          isMulti={field.isMulti}
          accept={field.accept}
          maxSize={field.maxSize}
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
          minDate={field.minDate}
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

export default formElementRenderer;
