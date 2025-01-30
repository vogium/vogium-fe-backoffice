import React from "react";

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
}) => {
  if (value !== index) {
    return null;
  }
  return <div>{children}</div>;
};
