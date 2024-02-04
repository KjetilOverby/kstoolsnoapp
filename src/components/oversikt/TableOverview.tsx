import React from "react";

type ValueType = Record<string, number>;

const TableOverview = ({ val, header }: { val: ValueType; header: string }) => {
  return (
    <div className="overflow-x-auto shadow-lg">
      <table className="table-xs w-full table-auto divide-y divide-gray-200">
        <thead>
          <tr className="text-left text-xs text-neutral">
            <th className="px-4 py-2">{header}</th>
            <th className="px-4 py-2">Antall</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-base-100">
          {Object.entries(val).map(([typeAndSide, count], index) => (
            <tr key={typeAndSide} className="border-none hover:bg-primary">
              <td className="">{typeAndSide}</td>
              <td className="">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOverview;
