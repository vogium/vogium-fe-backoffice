import { BaseField } from "./BaseFormField";

export class TextField extends BaseField {
  type = "text" as const;

  constructor({
    id,
    label,
    colSpan,
    editable,
    defaultValue,
    validationMessage,
  }: {
    id: string;
    label: string;
    colSpan: number;
    editable?: boolean;
    defaultValue?: any;
    validationMessage?: string;
  }) {
    super({
      id,
      label,
      colSpan,
      editable,
      defaultValue,
      validationMessage,
    });
  }
}
