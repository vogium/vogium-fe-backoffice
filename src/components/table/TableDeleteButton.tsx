export default function TableDeleteButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <img
      className="w-6 h-6 cursor-pointer"
      src="/icons/trash.svg"
      onClick={onClick}
    ></img>
  );
}
