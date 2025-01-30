export default function ButtonWithIcon({
  className = " ",
  containerClassName = "",
  onClickAction,
  iconSrc,
  iconClassName = "",
}: {
  className?: string;
  containerClassName?: string;
  onClickAction: (e: React.FormEvent) => void;
  iconSrc: string;
  iconClassName?: string;
}) {
  return (
    <div className={"w-fit h-fit " + containerClassName}>
      <button onClick={onClickAction} className={"group " + className}>
        <img
          src={iconSrc}
          className={
            "h-6 w-6 opacity-80 group-hover:opacity-100 " + iconClassName
          }
        ></img>
      </button>
    </div>
  );
}
