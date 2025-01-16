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
  return <div className={value === index ? "block" : "hidden"}>{children}</div>;
};
