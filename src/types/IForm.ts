export interface IFormField {
  id: string; // Unique ID for the field
  label: string; // Label text
  type:
    | "text"
    | "textarea"
    | "number"
    | "select"
    | "checkbox"
    | "custom"
    | "email"
    | "phone"
    | "document"
    | "datePicker"; // Field type
  colSpan: number; // Number of grid columns the field spans
  options?: { label: string; value: string | number }[]; // For select fields
  editable?: boolean; // Whether the field is editable
  defaultValue?: string | number | boolean; // Default value
  placeholder?: string; // Placeholder text
  render?: () => JSX.Element; // Custom render function
  validationMessage?: string; // Validation message
  isClearable?: boolean; // Whether the select field is clearable
  maxDate?: string; // Maximum date for date picker
  minDate?: string; // Minimum date for date picker
  isMulti?: boolean; // Whether the field accepts multiple values
  accept?: string; // File types accepted by file input
  maxSize?: number; // Maximum file size in MB
  min?: number; // Minimum value for number field
  max?: number; // Maximum value for number field
}

export interface IBaseFormElementProps {
  id: string;
  label: string;
  colSpan: number;
  editable?: boolean;
  value: unknown;
  onChange: (id: string, value: unknown) => void;
  validationMessage?: string;
}

export interface IFormLabelElementProps {
  id: string;
  label: string;
}

export interface ISelectOption {
  value: string | number;
  label: string;
}
