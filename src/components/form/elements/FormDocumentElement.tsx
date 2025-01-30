import React, { useCallback, useRef } from "react";
import { IBaseFormElementProps } from "../../../types/IForm";

import { ValidationMessage } from "../ValidationMessage";
import { useNotification, useTranslate } from "@refinedev/core";
import { NotificationsType } from "../../../enums/notifications/notifications-type.enum";
import FormLabelElement from "./FormLabelElement";

interface FormDocumentElementProps extends IBaseFormElementProps {
  isMulti?: boolean;
  accept?: string;
  maxSize?: number; // in MB
}

const FormDocumentElement: React.FC<FormDocumentElementProps> = ({
  id,
  label,
  colSpan,
  editable = true,
  value,
  onChange,
  validationMessage,
  isMulti = false,
  accept = ".pdf,.doc,.docx",
  maxSize = 5,
}) => {
  //todo burada belge görüntülemek için bir ikon. sonrasında modal olarak tüm sayfa boyutunda görüntülenebilir..
  //todo Tıklanıldığında doküman yeni bir sekmede açılır.
  const translate = useTranslate();
  const { open } = useNotification();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files?.length) return;

    try {
      if (isMulti) {
        const oversizedFiles = Array.from(files).filter(
          (file) => file.size > maxSize * 1024 * 1024
        );

        if (oversizedFiles.length) {
          open?.({
            message: `Files exceeding ${maxSize}MB limit: ${oversizedFiles
              .map((f) => f.name)
              .join(", ")}`,
            type: NotificationsType.WARNING,
          });
          return;
        }

        const base64Files = await Promise.all(
          Array.from(files).map((file) => convertToBase64(file))
        );
        onChange(id, base64Files);
      } else {
        const file = files[0];
        if (file.size > maxSize * 1024 * 1024) {
          open?.({
            message: `File ${file.name} exceeds ${maxSize}MB limit`,
            type: NotificationsType.WARNING,
          });
          return;
        }
        const base64 = await convertToBase64(file);
        onChange(id, base64);
      }
    } catch (error) {
      console.error("File conversion error:", error);
      open?.({
        message: "File conversion failed",
        type: NotificationsType.ERROR,
      });
    }
  };

  const handleRemove = (e: React.MouseEvent, index?: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (isMulti && typeof index === "number") {
      const newFiles = [...(value as string[])];
      newFiles.splice(index, 1);
      onChange(id, newFiles);
    } else {
      onChange(id, null);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderFileList = () => {
    if (!value) return null;

    if (isMulti && Array.isArray(value)) {
      return (
        <div className="mt-2 space-y-1">
          {value.map((file, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {translate("inputs.document.uploadedMultiple")} {index + 1}
              </span>
              <button
                onClick={(e) => handleRemove(e, index)}
                className="text-red-500 hover:text-red-700"
              >
                {translate("buttons.delete")}
              </button>
            </div>
          ))}
        </div>
      );
    }

    return value ? (
      <div className="mt-2 flex items-center space-x-2">
        <span className="text-sm text-gray-600">
          {translate("inputs.document.uploadedSingle")}
        </span>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700"
        >
          {translate("buttons.delete")}
        </button>
      </div>
    ) : null;
  };

  return (
    <div className={`col-span-${colSpan} flex flex-col`}>
      <FormLabelElement id={id} label={label} />

      <input
        ref={fileInputRef}
        type="file"
        id={id}
        accept={accept}
        disabled={!editable}
        multiple={isMulti}
        onChange={handleFileChange}
        className={`form-input ${validationMessage ? "danger-input" : ""}`}
      />

      {renderFileList()}
      <ValidationMessage message={validationMessage} />
    </div>
  );
};

export default FormDocumentElement;
