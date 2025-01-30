import { BaseField } from "./BaseFormField";

export class DatePickerField extends BaseField {
  type = "datePicker" as const;
  minDate?: string;
  maxDate?: string;

  constructor(props: {
    id: string;
    label: string;
    minDate?: string;
    maxDate?: string;
    colSpan?: number;
    editable?: boolean;
    defaultValue?: string;
    validationMessage?: string;
  }) {
    super(props);
    this.minDate = props.minDate;
    this.maxDate = props.maxDate;
  }
}
