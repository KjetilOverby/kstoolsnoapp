/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import FeilkodeChart from "./FeilkodeChart";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FeilkoderMain = ({ dateValue }: { dateValue: any }) => {
  const { data: sessionData } = useSession();
  const [kundeInit, setKundeInit] = useState("");

  const { data: feilkoders } = api.bandhistorikk.feilkoder.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
  });
  const { data: feilkodersCustomer } =
    api.bandhistorikk.feilkoderCustomer.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      init: kundeInit,
    });

  useEffect(() => {
    if (sessionData?.user.role === "ADMIN") {
      setKundeInit("");
    } else if (sessionData?.user.role === "MO_ADMIN") {
      setKundeInit("MØ");
    } else if (sessionData?.user.role === "MM_ADMIN") {
      setKundeInit("MM");
    }
  }, [sessionData]);

  return (
    <div>
      <h1 className="my-20 text-center text-xl">BYTTEÅRSAKER</h1>
      {sessionData?.user.role === "ADMIN" && (
        <div>
          <div className="text-neutrals  rounded-xl border border-primary p-5">
            <p className="mb-5 text-center text-xs">Bytteårsaker på sag 1-7</p>
            <div className="flex w-full justify-center"></div>
            <div>
              <FeilkodeChart data={feilkoders && feilkoders} />
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-primary p-5 text-neutral">
            <p className="mb-5 text-center text-xs"></p>
            <div></div>
          </div>
        </div>
      )}
      {sessionData?.user.role === "MO_ADMIN" && (
        <div>
          <div className="text-neutrals  rounded-xl border border-primary p-5">
            <p className="mb-5 text-center text-xs">Bytteårsaker på sag 1-7</p>
            <div className="flex w-full justify-center"></div>
            <div>
              <FeilkodeChart data={feilkodersCustomer && feilkodersCustomer} />
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-primary p-5 text-neutral">
            <p className="mb-5 text-center text-xs"></p>
            <div></div>
          </div>
        </div>
      )}
      {sessionData?.user.role === "MM_ADMIN" && (
        <div>
          <div className="text-neutrals  rounded-xl border border-primary p-5">
            <p className="mb-5 text-center text-xs">Bytteårsaker på sag 1-7</p>
            <div className="flex w-full justify-center"></div>
            <div>
              <FeilkodeChart data={feilkodersCustomer && feilkodersCustomer} />
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-primary p-5 text-neutral">
            <p className="mb-5 text-center text-xs"></p>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeilkoderMain;
