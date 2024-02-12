/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import ChartTimeCount from "../forbruk/ChartTimeCount";

const Tidsrapport = ({ dateValue, setDateValue }) => {
  const { data: sessionData } = useSession();
  const [kundeInit, setKundeInit] = useState("");

  const { data: sagtidSum } = api.bandhistorikk.countTimerSag.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
  });

  const totalSagtidSum = sagtidSum?.reduce(
    (sum, item) => sum + item.totalSagtid,
    0,
  );
  const totalServiceSum = sagtidSum?.reduce(
    (sum, item) => sum + item.countSagNr,
    0,
  );

  const { data: sagtidSumCustomer } =
    api.bandhistorikk.countTimerSagCustomer.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      init: kundeInit,
    });

  const totalSagtidSumCustomer = sagtidSumCustomer?.reduce(
    (sum, item) => sum + item.totalSagtid,
    0,
  );
  const totalServiceSumCustomer = sagtidSumCustomer?.reduce(
    (sum, item) => sum + item.countSagNr,
    0,
  );

  useEffect(() => {
    if (sessionData?.user.role === "ADMIN") {
      setKundeInit("");
    } else if (sessionData?.user.role === "MO_ADMIN") {
      setKundeInit("MØ");
    }
  }, [sessionData]);

  return (
    <div>
      <h1 className="my-20 text-center text-xl">TIDSFORBRUK</h1>
      {sessionData?.user.role === "ADMIN" && (
        <div>
          <div className="text-neutrals rounded-xl border border-primary p-5">
            <p className="mb-5 text-center text-xs">
              Total sagtid ({totalSagtidSum}) og antall serviceposter (
              {totalServiceSum}) fordelt på sagnummer i timer
            </p>
            <div>
              <ChartTimeCount sagtidSum={sagtidSum} />
            </div>
          </div>
        </div>
      )}
      {sessionData?.user.role === "MO_ADMIN" && (
        <div>
          <div className="text-neutrals rounded-xl border border-primary p-5">
            <p className="mb-5 text-center text-xs">
              Total sagtid ({totalSagtidSumCustomer}) og antall serviceposter (
              {totalServiceSumCustomer}) fordelt på sagnummer i timer
            </p>
            <div>
              <ChartTimeCount sagtidSum={sagtidSumCustomer} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tidsrapport;
