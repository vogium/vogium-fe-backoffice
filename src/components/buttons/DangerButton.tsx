import ButtonSkeleton from "./ButtonSkeleton";

export default function DangerButton({
  title,
  className = "",
  parentClassName = "",
  onClickAction,
  type = "button",
  isBlockState = false,
}: IBasicButton) {
  const buttonStyle =
    "bg-red-500 text-white hover:bg-red-600 hover:text-white border-red-500 hover:border-transparent";

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
