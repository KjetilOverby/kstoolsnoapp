/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { signIn, signOut, useSession } from "next-auth/react";

import AdminStartpage from "~/components/startpage/AdminStartpage";
import FrontpageSessionless from "~/components/startpage/FrontpageSessionless";
import CustomerStartpage from "../components/startpage/CustomerStartpage";
import NotLoggedInPage from "~/components/startpage/NotLoggedInPage";
import { useState } from "react";
import dateFormat from "dateformat";
import { api } from "~/utils/api";

interface adminProps {
  theme: string;
}

export default function Home({ theme }: adminProps) {
  const { data: sessionData } = useSession();

  const [dateValue, setDateValue] = useState({
    endDate: dateFormat(new Date(), "yyyy-mm-dd"),
    startDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });

  const { data: newblades } = api.sawblades.getAllcreate.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: "",
  });
  const { data: deletedblades } = api.sawblades.getAllDeleted.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
  });
  const { data: servicepost } =
    api.statistikkBladeData.getAllHistorikk.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
    });

  const { data: servicepostUpdate } =
    api.statistikkBladeData.getAllHistorikkUpdate.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
    });
  const { data: servicepostKS } =
    api.statistikkBladeData.getAllHistorikkKS.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
    });

  return (
    <div>
      {!sessionData && <NotLoggedInPage />}
      {sessionData && sessionData.user.role === "LOGIN" && (
        <FrontpageSessionless session={sessionData} />
      )}
      {sessionData && sessionData.user.role === "ADMIN" && (
        <AdminStartpage
          theme={theme}
          newblades={newblades}
          deletedblades={deletedblades}
          servicepost={servicepost}
          servicepostKS={servicepostKS}
          dateValue={dateValue}
          setDateValue={setDateValue}
          servicepostUpdate={servicepostUpdate}
        />
      )}
      {sessionData && sessionData.user.role === "MO_ADMIN" && (
        <CustomerStartpage />
      )}
    </div>
  );
}

//test
