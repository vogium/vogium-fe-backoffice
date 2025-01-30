import { useTranslate } from "@refinedev/core";
import React from "react";

type ValidationMessageProps = {
  message?: string;
};

export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  message,
}) => {
  const translate = useTranslate();
  if (!message) return null;

  return <p className="text-red-500 text-sm mt-1">{translate(message)}</p>;
};
