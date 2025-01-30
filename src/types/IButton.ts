export interface IButtonSkeleton {
  children: React.ReactNode;
  className?: string;
  parentClassName?: string;
  onClickAction: (e: React.FormEvent) => void;
  type?: "submit" | "button" | "reset";
  isBlockState?: boolean;
  showProgress?: boolean;
}

export interface IBasicButton {
  title: string;
  className?: string;
  parentClassName?: string;
  onClickAction: (e: React.FormEvent) => void;
  type?: "submit" | "button" | "reset";
  isBlockState?: boolean;
  showProgress?: boolean;
}
