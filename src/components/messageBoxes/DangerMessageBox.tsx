export default function DangerMessageBox({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
      role="alert"
    >
      <p className="font-bold">{title}</p>
      {description && <p className="mt-2">{description}</p>}
    </div>
  );
}
