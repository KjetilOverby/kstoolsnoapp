/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { getServerAuthSession } from "~/server/auth";
import { signIn, signOut, useSession } from "next-auth/react";
import StatistikkMain from "~/components/statistikk/StatistikkMain";
import HeaderComponent from "~/components/reusable/HeaderComponent";

import dateFormat from "dateformat";

const statistikk = ({ theme }) => {
  const { data: sessionData } = useSession();
  const [dateValue, setDateValue] = useState({
    endDate: dateFormat(new Date(), "yyyy-mm-dd"),
    startDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });

  useEffect(() => {
    if (sessionData?.user.role === "MO_ADMIN") {
      setCustomerInit("MØ-");
    } else if (sessionData?.user.role === "MM_ADMIN") {
      setCustomerInit("MM-");
    }
  }, [sessionData]);
  const [customerInit, setCustomerInit] = useState("");

  const { data: statistikkData } =
    api.statistikkBladeData.getAllHistorikk.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
    });

  const { data: statistikkDataMO } =
    api.statistikkBladeData.getAllCustomerHistorikk.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      bladeRelationId: customerInit,
      init: customerInit,
    });

  const { data: deletedSawblades } = api.sawblades.getAllDeletedStats.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: "",
  });
  const { data: deletedSawbladesMo } =
    api.sawblades.getCustomerAllDeletedStats.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      IdNummer: "",
      init: customerInit,
    });

  return (
    <div data-theme={theme} className="min-h-screen ">
      <HeaderComponent />
      {sessionData?.user.role === "ADMIN" && (
        <StatistikkMain
          historikkData={statistikkData}
          setDateValue={setDateValue}
          dateValue={dateValue}
          deletedSawblades={deletedSawblades}
        />
      )}
      {sessionData?.user.role === "MO_ADMIN" && (
        <StatistikkMain
          historikkData={statistikkDataMO}
          setDateValue={setDateValue}
          dateValue={dateValue}
          deletedSawblades={deletedSawbladesMo}
        />
      )}
      {sessionData?.user.role === "MM_ADMIN" && (
        <StatistikkMain
          historikkData={statistikkDataMO}
          setDateValue={setDateValue}
          dateValue={dateValue}
          deletedSawblades={deletedSawbladesMo}
        />
      )}
    </div>
  );
};

export default statistikk;
