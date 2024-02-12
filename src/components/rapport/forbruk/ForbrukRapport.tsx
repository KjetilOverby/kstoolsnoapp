/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import dateFormat from "dateformat";
import { useState, useEffect } from "react";
import DatepickerComponent from "~/components/reusable/Datepicker";
import { api } from "~/utils/api";
import BalanseChart from "./BalanseChart";
import DeleteReasonChart from "./DeleteReasonChart";
import { signIn, signOut, useSession } from "next-auth/react";

const ForbrukRapport = ({ dateValue, setDateValue }) => {
  const { data: sessionData } = useSession();
  const [kundeInit, setKundeInit] = useState("");

  const { data: forbruk } = api.sawblades.rapportDeleteReasons.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
  });
  const { data: forbrukCustomer } =
    api.sawblades.rapportDeleteReasonsCustomer.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      init: kundeInit,
    });

  const { data: countCreatedAndUpdated } =
    api.sawblades.countCreatedAndUpdated.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
    });
  const { data: countCreatedAndUpdatedCustomer } =
    api.sawblades.countCreatedAndUpdatedCustomer.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      init: kundeInit,
    });

  const filteredData = forbruk?.filter((item) => item.deleteReason !== "");
  const sortedData = filteredData?.sort((a, b) => b._count - a._count);
  const topThree = sortedData?.slice(0, 3);

  const filteredDataCustomer = forbrukCustomer?.filter(
    (item) => item.deleteReason !== "",
  );
  const sortedDataCustomer = filteredDataCustomer?.sort(
    (a, b) => b._count - a._count,
  );
  const topThreeCustomer = sortedDataCustomer?.slice(0, 3);

  useEffect(() => {
    if (sessionData?.user.role === "ADMIN") {
      setKundeInit("");
    } else if (sessionData?.user.role === "MO_ADMIN") {
      setKundeInit("MØ");
    }
  }, [sessionData]);

  return (
    <div>
      <h1 className="my-5 text-center text-xl">FORBRUK</h1>
      {sessionData?.user.role === "ADMIN" && (
        <div>
          <div className="text-neutrals rounded-xl border border-primary p-5">
            <p className="mb-5 text-center text-xs">
              Topp 3 vrakårsaker av {countCreatedAndUpdated?.Vraket} vrakede
              blad
            </p>
            <div>
              <DeleteReasonChart deleteReasonCount={topThree} />
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-primary p-5 text-neutral">
            <p className="mb-5 text-center text-xs">Nye og vraket</p>
            <div>
              <BalanseChart countCreatedAndUpdated={countCreatedAndUpdated} />
            </div>
          </div>
        </div>
      )}
      {sessionData?.user.role === "MO_ADMIN" && (
        <div>
          <div className="text-neutrals rounded-xl border border-primary p-5">
            <p className="mb-5 text-center text-xs">Top 3 vrakårsaker</p>
            <div>
              <DeleteReasonChart deleteReasonCount={topThreeCustomer} />
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-primary p-5 text-neutral">
            <p className="mb-5 text-center text-xs">
              Balanse mellom nye og vraket
            </p>
            <div>
              <BalanseChart
                countCreatedAndUpdated={countCreatedAndUpdatedCustomer}
              />
            </div>
          </div>
        </div>
      )}
      {sessionData?.user.role === "MM_ADMIN" && (
        <div>
          <div className="text-neutrals rounded-xl border border-primary p-5">
            <p className="mb-5 text-center text-xs">Top 3 vrakårsaker</p>
            <div>
              <DeleteReasonChart deleteReasonCount={topThreeCustomer} />
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-primary p-5 text-neutral">
            <p className="mb-5 text-center text-xs">
              Balanse mellom nye og vraket
            </p>
            <div>
              <BalanseChart
                countCreatedAndUpdated={countCreatedAndUpdatedCustomer}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForbrukRapport;
