import Card from "../Card";

export const BasicStatCard = ({
  title,
  value,
  isIncreased,
  iconSrc,
}: {
  title: string;
  value: number;
  isIncreased?: boolean;
  iconSrc?: string;
}) => {
  return (
    <Card>
      <div className="p-4 flex items-center justify-between h-full">
        <img
          src={iconSrc || "/icons/insertChart.svg"}
          alt={title}
          className="min-h-12 p-1"
        />
        <div className="">
          <h3 className="text-lg font-medium text-gray-500">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-3xl font-semibold">{value}</p>
          {isIncreased ? (
            <img
              src="/icons/arrowBack.svg"
              alt="arrow-up"
              className="w-6 h-6 rotate-90 filter-green"
            />
          ) : (
            <img
              src="/icons/arrowBack.svg"
              alt="arrow-down"
              className="w-6 h-6 -rotate-90 filter-red"
            />
          )}
        </div>
      </div>
    </Card>
  );
};
