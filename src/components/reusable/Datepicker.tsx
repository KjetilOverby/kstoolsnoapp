// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import Datepicker, {
  DateRangeType,
  DateType,
} from "react-tailwindcss-datepicker";

interface DateProps {
  setDateValue: React.Dispatch<
    React.SetStateAction<{
      endDate: string;
      startDate: string;
    }>
  >;
  dateValue: {
    endDate: string;
    startDate: string;
  };
}

const DatepickerComponent: React.FC<DateProps> = ({
  setDateValue,
  dateValue,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  const handleValueChange = (newValue: DateType | DateRangeType) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setDateValue(newValue);
  };

  return (
    <div className="mb-3 flex flex-col rounded-2xl bg-base-100">
      <p className="mb-3">Dato</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Datepicker
          placeholder={"Klikk her for å velge dato"}
          primaryColor={"orange"}
          showShortcuts={true}
          showFooter={true}
          startWeekOn="mon"
          configs={{
            shortcuts: {
              today: "I DAG",
              yesterday: "I GÅR",
              past: (period) => `${period} SISTE DAGER`,
              currentMonth: "DENNE MÅNEDEN",
              pastMonth: "SIST MÅNED",
            },
            footer: {
              cancel: "AVBRYT",
              apply: "PERIODE",
            },
          }}
          value={dateValue}
          onChange={handleValueChange}
        />
      </form>
    </div>
  );
};

export default DatepickerComponent;
