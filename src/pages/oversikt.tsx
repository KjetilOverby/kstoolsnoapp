/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import DatepickerComponent from "~/components/reusable/Datepicker";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import NotAuthorized from "~/components/reusable/NotAuthorized";
import TableOverview from "~/components/oversikt/TableOverview";

const oversikt = ({ theme }) => {
  const { data: sessionData } = useSession();
  const { data: sawblades } = api.sawblades.getAllNoInput.useQuery({});
  //   const { data: sawbladesMo } = api.sawblades.getAllCustomerNoInput.useQuery({
  //     init: "MØ",
  //   });

  const [typeCount, setTypeCount] = useState({});

  function getTypeCount(sawblades) {
    const typeCount = {};
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    sawblades?.forEach((blade) => {
      const type = blade.type;
      if (type) {
        if (type in typeCount) {
          typeCount[type]++;
        } else {
          typeCount[type] = 1;
        }
      }
    });
    return typeCount;
  }
  // TYPE AND SIDE

  const [typeAndSideCount, setTypeAndSideCount] = useState({});

  useEffect(() => {
    setTypeAndSideCount(getTypeAndSideCount(sawblades));
  }, [sawblades]);

  // Now you can use typeAndSideCount in your component

  function getTypeAndSideCount(sawblades) {
    // eslint-disable-next-line prefer-const
    let typeAndSideCount = {};
    sawblades?.forEach((blade) => {
      const type = blade.type;
      const side = blade.side;
      if (type && side) {
        const key = `${type}-${side}`;
        if (key in typeAndSideCount) {
          typeAndSideCount[key]++;
        } else {
          typeAndSideCount[key] = 1;
        }
      }
    });
    return typeAndSideCount;
  }

  useEffect(() => {
    setTypeCount(getTypeCount(sawblades));
  }, [sawblades]);
  console.log(typeCount);

  return (
    <div data-theme={theme} className="min-h-screen ">
      <HeaderComponent />
      <div className="px-48">
        <div className="mb-16">
          <p>Oversikt over alle typer blad i bruk og vraket</p>
          <TableOverview val={typeCount} header="Type" />
        </div>
        <div className="mb-16">
          <p>
            Oversikt over alle typer blad i bruk og vraket, høyre og venstre
          </p>
          <TableOverview val={typeAndSideCount} header="Type og side" />
        </div>
      </div>
    </div>
  );
};

export default oversikt;
