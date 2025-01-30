import { BaseField } from "./BaseFormField";

export class NumberField extends BaseField {
  type = "number" as const;
  min?: number;
  max?: number;

  constructor(props: {
    id: string;
    label: string;
    min?: number;
    max?: number;
    colSpan?: number;
    editable?: boolean;
    defaultValue?: number;
    validationMessage?: string;
  }) {
    super(props);
    this.min = props.min;
    this.max = props.max;
  }
}
