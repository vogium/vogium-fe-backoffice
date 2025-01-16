import ButtonSkeleton from "./ButtonSkeleton";

export default function NeutralButton({
  title,
  className = "",
  parentClassName = "",
  onClickAction,
  type = "button",
  isBlockState = false,
}: IBasicButton) {
  const buttonStyle =
    "bg-gray-300 text-gray-500 hover:bg-gray-500 hover:text-white border-gray-300 hover:border-transparent";

  return (
    <ButtonSkeleton
      className={buttonStyle + " " + className}
      parentClassName={parentClassName}
      onClickAction={onClickAction}
      type={type}
      isBlockState={isBlockState}
    >
      <span className={"self-stretch my-auto "}>{title}</span>
    </ButtonSkeleton>
  );
}
