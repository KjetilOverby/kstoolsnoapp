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
import { useEffect } from "react";

interface adminProps {
  theme: string;
}

export default function Home({ theme }: adminProps) {
  const { data: sessionData } = useSession();
  useEffect(() => {
    if (sessionData?.user.role === "MO_ADMIN") {
      setCustomerInit("MØ-");
    } else if (sessionData?.user.role === "MM_ADMIN") {
      setCustomerInit("MM-");
    }
  }, [sessionData]);
  const [customerInit, setCustomerInit] = useState("");

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

  // ********* CUSTOMERS **********

  const { data: newbladesCustomer } =
    api.sawblades.getAllcreateCustomer.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      IdNummer: "",
      init: customerInit,
    });
  const { data: deletedbladesCustomer } =
    api.sawblades.getAllDeletedCustomer.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      IdNummer: "",
      init: customerInit,
    });
  const { data: servicepostCustomer } =
    api.statistikkBladeData.getAllCustomerHistorikk.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      init: customerInit,
    });
  const { data: servicepostKScustomer } =
    api.statistikkBladeData.getAllHistorikkKScustomer.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      init: customerInit,
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
        <CustomerStartpage
          newblades={newbladesCustomer}
          dateValue={dateValue}
          setDateValue={setDateValue}
          deletedblades={deletedbladesCustomer}
          servicepost={servicepostCustomer}
          servicepostKS={servicepostKScustomer}
        />
      )}
      {sessionData && sessionData.user.role === "MM_ADMIN" && (
        <CustomerStartpage
          newblades={newbladesCustomer}
          dateValue={dateValue}
          setDateValue={setDateValue}
          deletedblades={deletedbladesCustomer}
          servicepost={servicepostCustomer}
          servicepostKS={servicepostKScustomer}
        />
      )}
    </div>
  );
}
