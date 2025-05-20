import { CircleCheck } from "lucide-react";

type LabelProps = {
  text: string;
  isFulfilled: boolean;
};

export default function Label({text, isFulfilled}: LabelProps) {
    return (
        <div className={`flex gap-y-1 items-center text-[14px] ${
  isFulfilled ? " text-[#009838] font-medium" : " text-[#A3A6AB]"
}`}>
         {<CircleCheck size={16} className={`mr-1 ${
          isFulfilled
            ? "stroke-[#ffffff] fill-[#009838]"
            : "stroke-[#A3A6AB] fill-white"
        }`} />}
         {text}
        </div>
    )
}