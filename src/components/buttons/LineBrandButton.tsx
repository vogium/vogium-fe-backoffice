import { IBasicButton } from "../../types/IButton";
import LineButtonSkeleton from "./LineButtonSkeleton";

export default function LineBrandButton({
  title,
  className = "",
  parentClassName = "",
  onClickAction,
  type = "button",
  isBlockState = false,
}: IBasicButton) {
  const buttonStyle = "!border-brand hover:bg-brand text-brand";

  return (
    <LineButtonSkeleton
      className={buttonStyle + " " + className}
      parentClassName={parentClassName}
      onClickAction={onClickAction}
      type={type}
      isBlockState={isBlockState}
    >
      <span className={"self-stretch my-auto"}>{title}</span>
    </LineButtonSkeleton>
  );
}
