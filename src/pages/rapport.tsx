/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import ForbrukRapport from "~/components/rapport/forbruk/ForbrukRapport";
import Tidsrapport from "~/components/rapport/tid/Tidsrapport";
import DatepickerComponent from "~/components/reusable/Datepicker";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import dateFormat from "dateformat";

interface Props {
  theme: string;
}

const Rapport = ({ theme }: Props) => {
  const [dateValue, setDateValue] = useState({
    endDate: dateFormat(new Date(), "yyyy-mm-dd"),
    startDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });
  return (
    <div data-theme={theme} className="min-h-screen ">
      <HeaderComponent />
      <h1 className="mt-5 text-center text-4xl">Rapport</h1>
      <div className="my-20 flex w-full justify-center">
        <p className="text-center">Velg tidsperiode</p>
        <DatepickerComponent
          setDateValue={setDateValue}
          dateValue={dateValue}
        />
      </div>
      <div className="mx-96 max-lg:mx-2">
        <ForbrukRapport dateValue={dateValue} setDateValue={setDateValue} />
        <Tidsrapport dateValue={dateValue} setDateValue={setDateValue} />
      </div>
    </div>
  );
};

export default Rapport;
