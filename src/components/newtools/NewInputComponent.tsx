"use client";

import { Dispatch, SetStateAction } from "react";

interface bladeDataProps {
  bladeData: {
    type: string;
    IdNummer: string;
    note: string;
    deleted: boolean;
    kunde: string;
    side: string;
    active: boolean;
    deleteReason: string;
    produsent: string;
  };
  setBladeData: Dispatch<
    SetStateAction<{
      type: string;
      IdNummer: string;
      deleted: boolean;
      note: string;
      kunde: string;
      side: string;
      active: boolean;
      deleteReason: string;
      produsent: string;
    }>
  >;
}

export const NewInputComponent = ({
  bladeData,
  setBladeData,
}: bladeDataProps) => {
  return (
    <div>
      <select
        onChange={(e) =>
          setBladeData({ ...bladeData, type: e.currentTarget.value })
        }
        className="select select-sm border-neutral bg-base-100 text-lg text-neutral"
      >
        <option disabled selected>
          Velg bladtype
        </option>

        <option value="1600. 180x1,47-STB45–Lengde 9855mm. (Z219)">
          1600. 180x1,47-STB45–Lengde 9855mm. (Z219)
        </option>

        <option value="1670. 180x1,47-T45–Lengde 9855mm. (Z219)">
          1670. 180x1,47-T45–Lengde 9855mm. (Z219)
        </option>

        <option value="1600. 180x1,25-STB40–Lengde 9840mm. (Z246)">
          1600. 180x1,25-STB40–Lengde 9840mm. (Z246)
        </option>

        <option value="1450. 180x1,25-STB40-Lengde 9840mm. (Z246)">
          1450. 180x1,25-STB40-Lengde 9840mm. (Z246)
        </option>

        <option value="LX60. 180x1,47–T45–lengde 9855mm. (Z219)">
          LX60. 180x1,47–T45–lengde 9855mm. (Z219)
        </option>
      </select>
    </div>
  );
};
