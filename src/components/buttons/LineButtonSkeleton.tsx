export default function LineButtonSkeleton({
  className = " ",
  parentClassName = "",
  onClickAction,
  type = "button",
  isBlockState = false,
  children,
}: IButtonSkeleton) {
  let buttonClassName =
    "px-5 py-2.5 w-full rounded-lg text-sm tracking-wider font-medium border border-black outline-none bg-transparent hover:bg-black text-black hover:text-white animation-smooth-fast  ";

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
