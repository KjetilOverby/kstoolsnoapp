/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
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

  return (
    <div>
      <h1 className="my-20 text-center text-xl">TIDSFORBRUK</h1>
      {sessionData?.user.role === "ADMIN" && (
        <div>
          <div className="text-neutrals rounded-xl border border-primary p-5">
            <p className="mb-5 text-center text-xs">
              Total sagtid og antall serviceposter
            </p>
            <div>
              <ChartTimeCount sagtidSum={sagtidSum} />
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-primary p-5 text-neutral">
            <p className="mb-5 text-center text-xs">
              Balanse mellom nye og vraket
            </p>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tidsrapport;
