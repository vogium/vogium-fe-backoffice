import { BaseField } from "./BaseFormField";

export class DocumentField extends BaseField {
  type = "document" as const;
  isMulti: boolean;
  accept: string;
  maxSize: number;

  constructor({
    id,
    label,
    isMulti = false,
    accept = ".pdf,.doc,.docx",
    maxSize = 5,
    colSpan = 6,
    editable = true,
    defaultValue,
    validationMessage,
  }: {
    id: string;
    label: string;
    isMulti?: boolean;
    accept?: string;
    maxSize?: number;
    colSpan?: number;
    editable?: boolean;
    defaultValue?: any;
    validationMessage?: string;
  }) {
    super({ id, label, colSpan, editable, defaultValue, validationMessage });
    this.isMulti = isMulti;
    this.accept = accept;
    this.maxSize = maxSize;
  }
}
