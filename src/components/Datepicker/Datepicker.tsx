import React from "react";

import { format, isSameMonth } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import DatepickerCss from "../Datepicker/DatepickerCss";
import { ko } from "date-fns/locale";

function Datepicker() {
  const today = new Date();
  const [month, setMonth] = React.useState<Date>(today);

  const [selected, setSelected] = React.useState<Date>();

  let footer = (
    <p>
      Please pick a day.
      <button
        disabled={isSameMonth(today, month)}
        onClick={() => setMonth(today)}
      >
        Go to Today
      </button>
    </p>
  );
  if (selected) {
    footer = (
      <p>
        You picked {format(selected, "PP")}.
        <button
          disabled={isSameMonth(today, month)}
          onClick={() => setMonth(today)}
        >
          Go to Today
        </button>
      </p>
    );
  }

  return (
    <>
      <DatepickerCss />
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={footer}
        month={month}
        onMonthChange={setMonth}
        locale={ko}
      />
    </>
  );
}

export default Datepicker;
