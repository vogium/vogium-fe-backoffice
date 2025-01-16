export default function ButtonSkeleton({
  className = " ",
  parentClassName = "",
  onClickAction,
  type = "button",
  isBlockState = false,
  children,
}: IButtonSkeleton) {
  let buttonClassName =
    "w-full font-semibold py-1 px-4 border-2 rounded animation-smooth-fast tracking-wider ";

  buttonClassName +=
    (isBlockState ? " cursor-not-allowed " : " cursor-pointer ") + className;

  return (
    <div className={parentClassName}>
      <button
        className={buttonClassName}
        onClick={(e: React.FormEvent) => {
          if (isBlockState) return;
          onClickAction(e);
        }}
        type={isBlockState ? "button" : type}
        style={{
          userSelect: "none",
        }}
      >
        {children}
      </button>
    </div>
  );
}
