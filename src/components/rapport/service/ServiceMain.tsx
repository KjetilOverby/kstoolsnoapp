/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import BfsChart from "./BfsChart";
import BSFTable from "~/components/reusable/BSFTable";

const ServiceMain = ({ dateValue }) => {
  const { data: sessionData } = useSession();
  const [kundeInit, setKundeInit] = useState("");

  const { data: bfsServiceData } = api.bandhistorikk.bfsServiceData.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
  });
  const { data: bfsServiceDataCustomer } =
    api.bandhistorikk.bfsServiceDataCustomer.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      init: kundeInit,
    });

  useEffect(() => {
    if (sessionData?.user.role === "ADMIN") {
      setKundeInit("");
    } else if (sessionData?.user.role === "MO_ADMIN") {
      setKundeInit("MØ");
    }
  }, [sessionData]);

  return (
    <div>
      <h1 className="my-20 text-center text-xl">SERVICE</h1>

      {sessionData?.user.role === "ADMIN" && (
        <div>
          <div className="text-neutrals  rounded-xl border border-primary p-5">
            <p className="mb-5 text-center text-xs">BFS koder antall service</p>
            <div className="flex w-full justify-center">
              <div className="mb-5 flex w-3/5">
                <BSFTable />
              </div>
            </div>
            <div>
              <BfsChart bfsServiceData={bfsServiceData} />
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
            <p className="mb-5 text-center text-xs">BFS koder antall service</p>
            <div className="flex w-full justify-center">
              <div className="mb-5 flex w-3/5">
                <BSFTable />
              </div>
            </div>
            <div>
              <BfsChart bfsServiceData={bfsServiceDataCustomer} />
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

export default ServiceMain;
