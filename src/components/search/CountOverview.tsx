import React from "react";

interface CountOverviewProps {
  countAllBlades: {
    total: number;
    notDeleted: number;
    deleted: number;
  };
  countAllHistorikk: number;
  countAllSagtid: number;
}

const CountOverview = ({
  countAllBlades,
  countAllHistorikk,
  countAllSagtid,
}: CountOverviewProps) => {
  return (
    <div className="mr-20">
      <p className="text-xs italic">Blad totalt: {countAllBlades?.total}</p>
      <p className="text-xs italic">
        Blad i bruk: {countAllBlades?.notDeleted}
      </p>
      <p className="text-xs italic">Blad slettet: {countAllBlades?.deleted}</p>
      <p className="text-xs italic">Serviceposter: {countAllHistorikk}</p>
      <p className="text-xs italic">Antall timer: {countAllSagtid}</p>
    </div>
  );
};

export default CountOverview;
