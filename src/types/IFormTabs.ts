import { IFormField } from "./IForm";

export interface IGroup {
  label: string;
  isLabelVisible?: boolean;
  fields: IFormField[];
}

export interface IFormTab {
  id: string;
  label: string;
  onSubmit?: (values: Record<string, unknown>) => void;
  isVisible?: boolean;
  // fields: IFormField[];
  groups: IGroup[];
}
