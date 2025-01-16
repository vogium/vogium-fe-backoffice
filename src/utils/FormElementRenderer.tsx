import FormCheckboxElement from "../components/form/FormCheckboxElement";
import FormDatePickerElement from "../components/form/FormDatePickerElement";
import { FormPhoneElement } from "../components/form/FormPhoneElement";
import FormSingleSelectElement from "../components/form/FormSingleSelectElement";
import FormTextElement from "../components/form/FormTextElement";
import { IFormField } from "../types/IForm";

interface IFormElementRendererProps {
  field: IFormField;
  formData: Record<string, unknown>;
  handleChange: (id: string, value: unknown) => void;
}

const formElementRenderer = ({
  field,
  formData,
  handleChange,
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

export default formElementRenderer;
