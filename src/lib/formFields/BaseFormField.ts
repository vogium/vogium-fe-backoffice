export class BaseField {
  id: string;
  label: string;
  colSpan: number;
  editable: boolean;
  defaultValue?: any;
  validationMessage?: string;

  constructor({
    id,
    label,
    colSpan = 6,
    editable = true,
    defaultValue,
    validationMessage,
  }: {
    id: string;
    label: string;
    colSpan?: number;
    editable?: boolean;
    defaultValue?: any;
    validationMessage?: string;
  }) {
    this.id = id;
    this.label = label;
    this.colSpan = colSpan;
    this.editable = editable;
    this.defaultValue = defaultValue;
    this.validationMessage = validationMessage;
  }
}
