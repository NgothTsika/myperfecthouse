"use client";

import { Range } from "react-date-range";
import Button from "../Button";
import Calendar from "../Imputs/Calendar";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubimt: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubimt,
  disabled,
  disabledDates,
}) => {
  return (
    <div className=" bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden ">
      <div className=" flex flex-row items-center gap-1 p-4 ">
        <div className=" text-2xl font-semibold">$ {price}</div>
        <div className=" font-light text-neutral-600 ">night</div>
      </div>
      <hr className="text-neutral-300/70" />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr className="text-neutral-300/70" />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onCLick={onSubimt} />
      </div>
      <div className=" p-4 flex flex-row items-center justify-between font-semibold text-lg ">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
