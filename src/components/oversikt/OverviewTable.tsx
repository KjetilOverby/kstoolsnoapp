/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

const OverviewTable = ({ count }) => {
  if (!count) {
    return null; // or return a loading indicator, or some other placeholder
  }

  // Group items by type and side
  const groupedItems = count.reduce((acc, item) => {
    const key = `${item.type}${item.side}`;
    if (!acc[key]) {
      acc[key] = {
        type: item.type,
        side: item.side,
        deletedCount: 0,
        nonDeletedCount: 0,
        totalCount: 0,
      };
    }
    if (item.deleted) {
      acc[key].deletedCount += item._count;
    } else {
      acc[key].nonDeletedCount += item._count;
    }
    acc[key].totalCount += item._count;
    return acc;
  }, {});

  // Convert the grouped items object to an array
  const itemsArray = Object.values(groupedItems);

  // Calculate the sums for each column
  const nonDeletedSum = itemsArray.reduce(
    (sum, item) => sum + item.nonDeletedCount,
    0,
  );
  const deletedSum = itemsArray.reduce(
    (sum, item) => sum + item.deletedCount,
    0,
  );
  const totalSum = itemsArray.reduce((sum, item) => sum + item.totalCount, 0);

  return (
    <div className="overflow-scroll">
      <table className="table table-xs">
        <thead>
          <tr className="border border-b-accent border-l-base-100 border-r-base-100 border-t-accent">
            <th className="text-[.7rem] md:text-xs">Type</th>
            <th className="text-[.7rem] md:text-xs">
              Blad i bruk: {nonDeletedSum}
            </th>
            <th className="text-[.7rem] md:text-xs">Slettet: {deletedSum}</th>
            <th className="text-[.7rem] md:text-xs">
              Totalt Antall {totalSum}
            </th>
          </tr>
        </thead>
        <tbody>
          {itemsArray.map((item, index) => (
            <tr key={index} className="border-none hover:bg-primary">
              <td className="py-5 text-[.7rem] md:text-xs">
                {item.type}
                {item.side}
              </td>
              <td className="py-5 text-[.7rem] md:text-xs">
                {item.nonDeletedCount}
              </td>
              <td className="py-5 text-[.7rem] md:text-xs">
                {item.deletedCount}
              </td>
              <td className="py-5 text-[.7rem] md:text-xs">
                {item.totalCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverviewTable;
