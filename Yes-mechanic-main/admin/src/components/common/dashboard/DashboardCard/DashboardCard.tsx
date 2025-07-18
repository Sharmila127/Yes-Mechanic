import { FONTS } from "../../../../constants/uiConstants";
import { ChartCard } from "../LineChart/LineChart";
import React from "react";

type DashboardCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  per: number;
  perColor: string;
  borderColor: string;
  backgroundColor: string;
  dataPoints: number[];
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  per,
  perColor,
  borderColor,
  backgroundColor,
  dataPoints,
}) => {
  return (
    <div className="rounded-xl bg-[#FAF3EB] shadow-md p-4 w-full max-w-[250px] h-[130px]   hover:scale-[1.06]  mt-7"> 
    {/* need to add hover effort of shaking */}
      <div className="flex items-center justify-between">
        {/* Icon box */}
        <div
          className="w-10 h-10 rounded-md flex items-center justify-center "
          style={{ backgroundColor }}
        >
          <div className="text-white text-xl">{icon}</div>
        </div>

        {/* Title and Value */}
        <div className="flex flex-col justify-center ml-2 grow">
          <p className="text-xs text-gray-500" style={{...FONTS.paragraph}}>{title}</p>
          <h3 className="text-lg">{value}</h3>
        </div>

        {/* Percentage */}
        <div>
          <span className="text-xs font-bold" style={{ color: perColor }}>
            {per}%
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-3">
        <ChartCard
          dataPoints={dataPoints}
          borderColor={borderColor}
          backgroundColor={`${borderColor.replace("0.8", "0.1")}`}
        />
      </div>
    </div>
  );
};

export default DashboardCard;
