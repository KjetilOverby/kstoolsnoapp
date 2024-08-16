/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import DatepickerComponent from "~/components/reusable/Datepicker";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import NotAuthorized from "~/components/reusable/NotAuthorized";
import TableOverview from "~/components/oversikt/TableOverview";
import OverviewTable from "~/components/oversikt/OverviewTable";

const oversikt = ({ theme }) => {
  const { data: sessionData } = useSession();
  const [KundeId, setKundeId] = useState("");

  const { data: count } = api.sawblades.countSawblades.useQuery();

  const { data: countCustomer } = api.sawblades.countSawbladesCustomer.useQuery(
    {
      init: KundeId,
    },
  );

  useEffect(() => {
    if (sessionData?.user.role === "ADMIN") {
      setKundeId("");
    } else if (sessionData?.user.role === "MO_ADMIN") {
      setKundeId("MØ");
    }
  }, [sessionData]);

  return (
    <div data-theme={theme} className="min-h-screen ">
      <HeaderComponent />
      {sessionData?.user.role === "ADMIN" && (
        <>
          <div className="mx-5 min-h-screen bg-base-100 md:p-5 md:max-lg:p-0 xl:mx-96">
            <div className="overflow-x-auto">
              <h1 className="my-5">Oversikt over blad alle kunder:</h1>
              <p className="text-xs italic">
                I tabellen vises slettet og total antall verdier fra start
                14.02.2024
              </p>
              <OverviewTable count={count} deleted={false} />
            </div>
          </div>
        </>
      )}
      {sessionData?.user.role === "MO_ADMIN" && (
        <div className="mx-5 min-h-screen bg-base-100 md:p-5 md:max-lg:p-0 xl:mx-96">
          <div className="overflow-x-auto">
            <h1 className="my-5">Oversikt over blad:</h1>
            <p className="text-xs italic">
              I tabellen vises slettet og total antall verdier fra start
              15.02.2024
            </p>
            <OverviewTable count={countCustomer} deleted={false} />
          </div>
        </div>
      )}
    </div>
  );
};

export default oversikt;
