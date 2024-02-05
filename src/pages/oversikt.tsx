/* eslint-disable @typescript-eslint/restrict-plus-operands */
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
  const [KundeId, setKundeId] = useState("");
  const { data: sawblades } = api.sawblades.getAllNoInput.useQuery({
    init: KundeId,
  });

  useEffect(() => {
    if (sessionData?.user.role === "ADMIN") {
      setKundeId("");
    } else if (sessionData?.user.role === "MO_ADMIN") {
      setKundeId("MØ");
    }
  }, [sessionData]);

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

  const totalAll = Object.values(typeCount).reduce((a, b) => a + Number(b), 0);

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

  // *************   Blades in use *************

  const [typeCountInUse, setTypeCountInUse] = useState({});

  const { data: sawbladesInUse } = api.sawblades.getAllNoInputInUse.useQuery({
    init: KundeId,
  });

  function getTypeCountInUse(sawbladesInUse) {
    // eslint-disable-next-line prefer-const
    let typeAndSideCount = {};
    sawbladesInUse?.forEach((blade) => {
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
    setTypeCountInUse(getTypeCountInUse(sawbladesInUse));
  }, [sawbladesInUse]);

  const totalAllInUse = Object.values(typeCountInUse).reduce<number>(
    (a: number, b: number) => a + b,
    0,
  );

  return (
    <div data-theme={theme} className="min-h-screen ">
      {sessionData?.user.role === "ADMIN" ||
      sessionData?.user.role === "MO_ADMIN" ? (
        <>
          <HeaderComponent />

          <div className="mx-5 min-h-screen bg-base-100 p-5 md:max-lg:p-0 xl:mx-96">
            <div>
              <h1 className="my-5 text-2xl">Oversikt over alle blad</h1>
              <div className="mb-16">
                <p>
                  Oversikt over alle typer blad i bruk og vraket ({totalAll})
                </p>
                <TableOverview val={typeCount} header="Type" />
              </div>
              <div className="mb-16">
                <p>
                  Oversikt over alle typer blad i bruk og vraket, høyre og
                  venstre ({totalAll})
                </p>
                <TableOverview val={typeAndSideCount} header="Type og side" />
              </div>
            </div>
            <div>
              <h1 className="my-5 text-2xl">Oversikt over alle blad i bruk</h1>
              <div className="mb-16">
                <p>
                  Oversikt over alle typer blad i bruk, høyre og venstre (
                  {totalAllInUse})
                </p>
                <TableOverview val={typeCountInUse} header="Type og side" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
};

export default oversikt;
