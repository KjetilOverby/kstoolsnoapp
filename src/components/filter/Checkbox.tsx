/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";

const Checkbox = ({ sawbladeColumns, setSawbladeColumns, title }) => {
  const [allChecked, setAllChecked] = useState(false);

  const toggleAll = () => {
    const newValues = Object.keys(sawbladeColumns).reduce((obj, key) => {
      obj[key] = !allChecked;
      return obj;
    }, {});
    setSawbladeColumns(newValues);
    setAllChecked(!allChecked);
  };

  return (
    <div className="flex w-96 flex-col p-5 shadow-2xl">
      <h1>{title}</h1>
      <p className="my-5">Velg hvilke data som skal vises</p>
      <button
        className="btn mb-5 bg-green-500 text-white hover:bg-green-600"
        onClick={toggleAll}
      >
        {allChecked ? "Uncheck All" : "Check All"}
      </button>
      {Object.entries(sawbladeColumns).map(([key, value], index) => (
        <div key={index}>
          <input
            type="checkbox"
            className="toggle toggle-success mr-10 "
            checked={value}
            onChange={() => {
              setSawbladeColumns((prevState) => ({
                ...prevState,
                [key]: !prevState[key],
              }));
            }}
          />
          <label>{key}</label>
        </div>
      ))}
    </div>
  );
};

export default Checkbox;
