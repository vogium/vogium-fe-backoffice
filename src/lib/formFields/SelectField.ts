import { BaseField } from "./BaseFormField";

export class SelectField extends BaseField {
  type = "select" as const;
  options: any[];
  isClearable: boolean;

  constructor({
    id,
    label,
    options,
    isClearable = false,
    colSpan = 6,
    editable = true,
    defaultValue,
    validationMessage,
  }: {
    id: string;
    label: string;
    options: any[];
    isClearable?: boolean;
    colSpan?: number;
    editable?: boolean;
    defaultValue?: any;
    validationMessage?: string;
  }) {
    super({ id, label, colSpan, editable, defaultValue, validationMessage });
    this.options = options;
    this.isClearable = isClearable;
  }
}
