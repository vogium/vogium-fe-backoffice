import { IBasicButton } from "../../types/IButton";
import LineButtonSkeleton from "./LineButtonSkeleton";

export default function LineSuccessButton({
  title,
  className = "",
  parentClassName = "",
  onClickAction,
  type = "button",
  isBlockState = false,
}: IBasicButton) {
  // const buttonStyle =
  //   "border-none focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ";
  const buttonStyle = "!border-green-700 hover:bg-green-700 text-green-700";

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
