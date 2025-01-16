export default function TableShowButton({ onClick }: { onClick: () => void }) {
  return (
    <img
      className="w-6 h-6 cursor-pointer"
      src="/icons/edit.svg"
      onClick={onClick}
    ></img>
  );
}
