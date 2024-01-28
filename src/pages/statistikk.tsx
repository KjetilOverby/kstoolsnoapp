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

const statistikk = ({ theme }) => {
  const { data: sessionData } = useSession();
  const [dateValue, setDateValue] = useState({
    endDate: "2040-01-14",
    startDate: "2023-12-01",
  });

  const { data: statistikkData } =
    api.statistikkBladeData.getAllHistorikk.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
    });

  const { data: statistikkDataMO } =
    api.statistikkBladeData.getAllCustomerHistorikk.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      bladeRelationId: "MØ",
      init: "MØ",
    });

  const { data: deletedSawblades } = api.sawblades.getAllDeleted.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: "",
  });
  const { data: deletedSawbladesMo } =
    api.sawblades.getCustomerAllDeleted.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      IdNummer: "",
      init: "MØ",
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
    </div>
  );
};

export default statistikk;
