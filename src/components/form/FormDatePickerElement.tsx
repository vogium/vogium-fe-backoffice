import { Datepicker } from "flowbite-react";
import FormLabelElement from "./FormLabelElement";
import { ValidationMessage } from "./ValidationMessage";
import { useGetLocale, useTranslate } from "@refinedev/core";
interface FormDatePickerElementProps {
  id: string;
  label: string;
  value?: string;
  onChange: (id: string, value: string) => void;
  editable?: boolean;
  colSpan?: number;
  validationMessage?: string;
  maxDate?: Date;
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
}: FormDatePickerElementProps) {
  const translate = useTranslate();
  // const maxDate = new Date(2011, 3, 30);
  const controlledValue = value ? new Date(value) : maxDate;
  const getLocale = useGetLocale();

  return (
    <div className={`col-span-${colSpan} flex flex-col w-full`}>
      <FormLabelElement id={id} label={label} />

      <Datepicker
        language={getLocale()}
        value={controlledValue}
        labelTodayButton={translate("datepicker.today")}
        labelClearButton={translate("datepicker.clear")}
        onChange={(date) => onChange(id, date ? date.toISOString() : "")}
        disabled={!editable}
        minDate={new Date(1930, 0, 1)}
        maxDate={maxDate}
      />
      <ValidationMessage message={validationMessage} />
    </div>
  );
}
