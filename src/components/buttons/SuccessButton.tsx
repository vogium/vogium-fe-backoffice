import { IBasicButton } from "../../types/IButton";
import ButtonSkeleton from "./ButtonSkeleton";

export default function SuccessButton({
  title,
  className = "",
  parentClassName = "",
  onClickAction,
  type = "button",
  isBlockState = false,
  showProgress = false,
}: IBasicButton) {
  const buttonStyle =
    "border-none focus:outline-none text-white bg-brand/90 hover:bg-brand focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ";

  return (
    <ButtonSkeleton
      className={buttonStyle + " " + className}
      parentClassName={parentClassName}
      onClickAction={onClickAction}
      type={type}
      isBlockState={isBlockState}
      showProgress={showProgress}
    >
      <span className={"self-stretch my-auto"}>{title}</span>
    </ButtonSkeleton>
  );
}
