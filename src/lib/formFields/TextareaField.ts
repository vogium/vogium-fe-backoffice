import { BaseField } from "./BaseFormField";

export class TextareaField extends BaseField {
  type = "textarea" as const;

  constructor(props: {
    id: string;
    label: string;
    rows?: number;
    colSpan?: number;
    editable?: boolean;
    defaultValue?: string;
    validationMessage?: string;
  }) {
    super(props);
  }
}
