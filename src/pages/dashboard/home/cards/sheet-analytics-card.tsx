import { MatricsType } from "../../../../types";
import { cn, currencyFormate } from "../../../../utils";

import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

interface CompProps {
  matrics: MatricsType;
}

const style = {
  income: "bg-emerald-500",
  expense: "bg-red-500",
  investment: "bg-orange-500",
  profit: "bg-blue-500",
};

const Icons = {
  income: <BsGraphUpArrow className="text-emerald-500 size-5" />,
  expense: <BsGraphDownArrow className="text-red-500 size-5" />,
  investment: <VscGraphLine className="text-orange-500 size-5" />,
  profit: <RiMoneyRupeeCircleLine className="text-blue-500 size-5" />,
};

const SheetAnalyticsCard = ({ matrics }: CompProps) => {
  const { total, type } = matrics;

  return (
    <div
      className={cn(
        "w-full rounded-md p-5 flex flex-col shadow-sm",
        style[type]
      )}
    >
      <div className="flex w-full items-center space-x-3">
        <div className="p-2 rounded-md bg-white">{Icons[type]}</div>
        <h1 className="font-medium text-white text-lg">
          {type.slice(0, 1).toUpperCase() + type.slice(1)}
        </h1>
      </div>
      <p className="text-white mt-1 font-light text-xl ml-2">
        {currencyFormate(total)}
      </p>
    </div>
  );
};

export default SheetAnalyticsCard;
