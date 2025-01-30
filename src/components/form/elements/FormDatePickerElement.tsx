import FormLabelElement from "./FormLabelElement";
import { ValidationMessage } from "../ValidationMessage";

interface FormDatePickerElementProps {
  id: string;
  label: string;
  value?: string;
  onChange: (id: string, value: string) => void;
  editable?: boolean;
  colSpan?: number;
  validationMessage?: string;
  maxDate?: string;
  minDate?: string;
}

export default function FormDatePickerElement({
  id,
  label,
  colSpan,
  editable,
  value,
  onChange,
  validationMessage,
  maxDate,
  minDate,
}: FormDatePickerElementProps) {
  return (
    <div className={`col-span-${colSpan} flex flex-col w-full`}>
      <FormLabelElement id={id} label={label} />
      <input
        type="date"
        id={id}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        min={minDate}
        max={maxDate}
        disabled={!editable}
        className="border border-gray-300 rounded-md p-2 mt-1"
        onInput={(e) => {
          e.currentTarget.setCustomValidity("");
        }}
      ></input>
      <ValidationMessage message={validationMessage} />
    </div>
  );
}
