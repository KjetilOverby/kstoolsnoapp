/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState, useEffect } from "react";
import DatepickerComponent from "../reusable/Datepicker";
import BarCharts from "../statistikk/BarCharts";

interface statistikkProps {
  historikkData: {
    feilkode: string;
    sagNr: string;
  };
}

const StatistikkMain = ({
  historikkData,
  setDateValue,
  dateValue,
  deletedSawblades,
}: statistikkProps) => {
  const deleteReasons: string[] = [
    "Normal slitasje",
    "Ikjøring",
    "Røk av",
    "Sprekk",
    "Dårlig stamme",
    "Varmekjørt",
    "Store tannskader",
    "Oppspenningsfeil i sag",
  ];
  const deleteReasonCount = deleteReasons.reduce((countObj, reason) => {
    countObj[reason] = 0;
    return countObj;
  }, {});

  deletedSawblades?.forEach((blade) => {
    const reason = blade.deleteReason;
    if (reason in deleteReasonCount) {
      deleteReasonCount[reason]++;
    }
  });

  const feilkoder: string[] = [
    "Ingen anmerkning",
    "Bølger",
    "Vandrer på hjul",
    "Sprekk",
    "Tannbrudd",
    "Sponpåliming",
    "Sløv",
    "Riper",
    "Ytre faktorer",
    "Reklamasjon",
    "Havari",
    "Ikjøring",
    "Riper/bølger",
    "Riper/sprekk",
    "Riper/vandrer",
    "Bølger/sprekk",
    "Bølger/vandrer",
    "Ikjøring/riper",
  ];

  const [tableData, setTableData] = useState<
    Record<string, { total: number; [key: string]: number }>
  >({});

  useEffect(() => {
    const updatedTableData: Record<
      string,
      { total: number; [key: string]: number }
    > = {};

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    historikkData?.forEach((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { sagNr, feilkode } = item;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!updatedTableData[sagNr]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        updatedTableData[sagNr] = { total: 1, [feilkode]: 1 };
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        updatedTableData[sagNr].total += 1;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        updatedTableData[sagNr][feilkode] =
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (updatedTableData[sagNr][feilkode] ?? 0) + 1;
      }
    });

    setTableData(updatedTableData);
  }, [historikkData]);

  return (
    <div className="px-10 pb-10">
      <div className="mx-5 mt-5 max-lg:mx-0">
        <div>
          <div className="w-1/5 shadow-xl max-lg:w-full">
            <DatepickerComponent
              setDateValue={setDateValue}
              dateValue={dateValue}
            />
          </div>
          <h1 className="mt-10">Bytteårsaker</h1>
          <div className="max-lg:overflow-scroll">
            <table className="table table-xs whitespace-nowrap bg-base-100">
              <thead>
                <tr className="border border-b-primary border-l-base-100 border-r-base-100 border-t-primary">
                  <th className="text-sm text-neutral">Sag</th>
                  <th className="text-sm text-neutral">Antall</th>
                  {feilkoder.map((feilkode) => (
                    <th key={feilkode} className="text-sm text-neutral">
                      {feilkode}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(tableData).map(([sagNr, data]) => (
                  <tr
                    className="border border-base-100 bg-base-100 hover:bg-primary"
                    key={sagNr}
                  >
                    <td className="border border-base-100 bg-base-100 px-4 py-2 text-neutral">
                      {sagNr} {sagNr % "2" == "0" ? "H" : "V"}
                    </td>
                    <td className="border border-base-100 px-4 py-2">
                      {data.total}
                    </td>

                    {feilkoder.map((feilkode) => (
                      <td
                        key={feilkode}
                        className={`border border-base-100 px-4 py-2 ${
                          data[feilkode] ? "text-orange-600" : ""
                        }`}
                      >
                        {data[feilkode] ?? 0}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="">
          <h1 className="mt-10">Bytteårsaker i prosent</h1>
          <div className="max-lg:overflow-scroll">
            <table className="table table-xs whitespace-nowrap bg-neutral">
              <thead>
                <tr className="border border-b-primary border-l-base-100 border-r-base-100 border-t-primary bg-base-100 ">
                  <th className="text-sm text-neutral">Sag</th>
                  <th className="text-sm text-neutral">Antall</th>
                  {feilkoder.map((feilkode) => (
                    <th key={feilkode} className="text-sm text-neutral">
                      {feilkode}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(tableData).map(([sagNr, data]) => (
                  <tr className="bg-base-100 hover:bg-primary" key={sagNr}>
                    <td className="border border-base-100 bg-base-100 px-4 py-2 text-neutral">
                      {sagNr} {sagNr % "2" == "0" ? "H" : "V"}
                    </td>
                    <td className="border border-base-100 px-4 py-2">
                      {data.total}
                    </td>
                    {feilkoder.map((feilkode) => (
                      <td
                        key={feilkode}
                        className={`border border-base-100 px-4 py-2 ${
                          data[feilkode] ? "text-orange-600" : ""
                        }`}
                      >
                        {data?.total
                          ? (
                              ((data[feilkode] ?? 0) / data.total) * 100 || 0
                            ).toFixed(1) + "%"
                          : "0%"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-20 flex w-full rounded-xl border border-base-100 p-5 shadow-2xl max-lg:grid">
          <div className="w-2/5 max-lg:w-full">
            <h1 className="text-2xl text-neutral">Vrak</h1>
            <p className="text-neutral">
              Antall vrak: {deletedSawblades?.length}
            </p>
            <BarCharts deleteReasonCount={deleteReasonCount} />
          </div>
          <div className="ml-16 w-3/5 rounded-xl border border-primary bg-base-100 p-5 max-lg:ml-0 max-lg:w-full">
            {
              <>
                <h1 className="text-neutral">Vrak:</h1>
                <ul className=" italic text-neutral">
                  {Object.entries(deleteReasonCount).map(([reason, count]) => (
                    <li key={reason}>
                      {reason}: {count}
                    </li>
                  ))}
                </ul>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistikkMain;
