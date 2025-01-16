export interface IFormField {
  id: string; // Unique ID for the field
  label: string; // Label text
  type:
    | "text"
    | "number"
    | "select"
    | "checkbox"
    | "custom"
    | "email"
    | "phone"
    | "datePicker"; // Field type
  options?: { label: string; value: string | number }[]; // For select fields
  editable?: boolean; // Whether the field is editable
  defaultValue?: string | number | boolean; // Default value
  placeholder?: string; // Placeholder text
  colSpan: number; // Number of grid columns the field spans
  render?: () => JSX.Element; // Custom render function
  validationMessage?: string; // Validation message
  maxDate?: Date; // Maximum date for date picker
}

export interface IBaseFormElementProps {
  id: string;
  label: string;
  colSpan: number;
  editable?: boolean;
  value: any;
  onChange: (id: string, value: any) => void;
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
