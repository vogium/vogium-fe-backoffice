interface IButtonSkeleton {
  // title: string;
  children: React.ReactNode;
  className?: string;
  parentClassName?: string;
  onClickAction: (e: React.FormEvent) => void;
  type?: "submit" | "button" | "reset";
  isBlockState?: boolean;
  //   styleType?: "success" | "danger" | "info" | "warning";
}

interface IBasicButton {
  title: string;
  className?: string;
  parentClassName?: string;
  onClickAction: (e: React.FormEvent) => void;
  type?: "submit" | "button" | "reset";
  isBlockState?: boolean;
  //   styleType?: "success" | "danger" | "info" | "warning";
}
