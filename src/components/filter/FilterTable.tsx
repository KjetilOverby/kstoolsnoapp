/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

const FilterTable = ({ data }) => {
  return (
    <div>
      <table className="table table-xs ">
        <thead>
          <tr className="bg-blue-400 text-white ">
            {data?.length > 0 &&
              Object.keys(data[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            <tr key={index} className="hover:cursor-pointer hover:bg-primary">
              {Object.values(item).map((value, i) => (
                <td key={i} className="whitespace-nowrap">
                  {value instanceof Date
                    ? value.toISOString()
                    : typeof value === "boolean"
                      ? value.toString()
                      : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilterTable;
