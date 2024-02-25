/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import Checkbox from "~/components/filter/Checkbox";
import FilterTable from "~/components/filter/FilterTable";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import { api } from "~/utils/api";
import { CSVLink } from "react-csv";
import dateFormat from "dateformat";
import DatepickerComponent from "~/components/reusable/Datepicker";

interface Props {
  theme: string;
}

const Filter = ({ theme }: Props) => {
  const [sawbladesData, setSawbladesData] = useState();
  const [historikkData, setHistorikkData] = useState([]);

  const [sawbladeColumns, setSawbladeColumns] = useState({
    id: false,
    createdAt: false,
    updatedAt: false,
    kunde: false,
    type: false,
    IdNummer: true,
    createdById: false,
    userId: false,
    creator: false,
    creatorImg: false,
    deleted: false,
    note: false,
    side: false,
    active: false,
    deleteReason: false,
    produsent: false,
    deleter: false,
    deleterImg: false,
  });
  const [historikkColumns, setHistorikkColumns] = useState({
    id: false,
    historikkId: false,
    createdAt: false,
    updatedAt: false,
    userId: false,
    sagNr: false,
    datoInn: false,
    klInn: false,
    datoUt: false,
    klUt: false,
    sagtid: false,
    feilkode: false,
    temperatur: false,
    sideklaring: false,
    ampere: false,
    stokkAnt: false,
    anmSag: false,
    creator: false,
    creatorImg: false,
    anmKS: false,
    sgSag: false,
    sgKS: false,
    handling: false,
    side: false,
    bladType: false,
    datoSrv: false,
    activePost: false,
    bladeRelationId: true,
    alt: false,
    creator2: false,
    creatorImg2: false,
    creator3: false,
    creatorImg3: false,
  });

  const [dateValue, setDateValue] = useState({
    endDate: dateFormat(new Date(), "yyyy-mm-dd"),
    startDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });

  const [fetchData, setFetchData] = useState(false);
  const { data: sawblades } = api.sawblades?.columns.useQuery({
    ...sawbladeColumns,
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
  });
  const { data: historikk } = api.bandhistorikk?.columns.useQuery({
    ...historikkColumns,
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
  });

  const [openToggle, setOpenToggle] = useState(true);
  const [openBandsag, setOpenBandsag] = useState(false);
  const [openHistorikk, setOpenHistorikk] = useState(false);

  const openBandsagHandler = () => {
    setOpenBandsag(!openBandsag);
    setOpenHistorikk(false);
  };
  const openHistorikkHandler = () => {
    setOpenHistorikk(!openHistorikk);
    setOpenBandsag(false);
  };

  useEffect(() => {
    // eslint-disable-next-line prefer-const

    const data = sawblades?.map((item) => {
      const object = {
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        kunde: item.kunde,
        type: item.type,
        IdNummer: item.IdNummer,
        createdById: item.createdById,
        userId: item.userId,
        creator: item.creator,
        creatorImg: item.creatorImg,
        deleted: item.deleted,
        note: item.note,
        side: item.side,
        active: item.active,
        deleteReason: item.deleteReason,
        produsent: item.produsent,
        deleter: item.deleter,
        deleterImg: item.deleterImg,
      };
      Object.keys(object).forEach(
        (key) => object[key] == null && delete object[key],
      );
      return object;
    });
    setSawbladesData(data);
  }, [sawblades]);

  useEffect(() => {
    const data = historikk?.map((item) => {
      const object = {
        id: item.id,
        historikkId: item.historikkId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        userId: item.userId,
        sagNr: item.sagNr,
        datoInn: item.datoInn,
        klInn: item.klInn,
        klUt: item.klUt,
        datoUt: item.datoUt,
        sagtid: item.sagtid,
        feilkode: item.feilkode,
        temperatur: item.temperatur,
        sideklaring: item.sideklaring,
        ampere: item.ampere,
        stokkAnt: item.stokkAnt,
        anmSag: item.anmSag,
        creator: item.creator,
        creatorImg: item.creatorImg,
        anmKS: item.anmKS,
        sgSag: item.sgSag,
        sgKS: item.sgKS,
        handling: item.handling,
        side: item.side,
        bladType: item.bladType,
        datoSrv: item.datoSrv,
        activePost: item.activePost,
        bladeRelationId: item.bladeRelationId,
        alt: item.alt,
        creator2: item.creator2,
        creatorImg2: item.creatorImg2,
        creator3: item.creator3,
        creatorImg3: item.creatorImg3,
      };
      // Filter out properties with null or undefined values
      Object.keys(object).forEach(
        (key) => object[key] == null && delete object[key],
      );
      return object;
    });
    setHistorikkData(data);
  }, [historikk]);

  console.log(historikkData);

  return (
    <div data-theme={theme} className="min-h-screen ">
      <HeaderComponent />
      <div className="mx-96">
        <div className="shadow-xl">
          <DatepickerComponent
            setDateValue={setDateValue}
            dateValue={dateValue}
          />
        </div>
        <button
          onClick={openBandsagHandler}
          className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
        >
          Båndsagblad
        </button>
        <button
          onClick={openHistorikkHandler}
          className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
        >
          Historikk
        </button>
      </div>
      {openBandsag && (
        <div className="m-10">
          {openToggle && (
            <div>
              <Checkbox
                sawbladeColumns={sawbladeColumns}
                setSawbladeColumns={setSawbladeColumns}
                title="Båndsagblad"
              />
            </div>
          )}
          <button
            className="btn my-5 bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => {
              if (Object.values(sawbladeColumns).some((value) => value)) {
                setFetchData(true);
                setOpenToggle(false);
              } else {
                alert("Velg minst en kolonne!");
              }
            }}
          >
            Hent data
          </button>
          <div className="card-actions justify-end">
            {sawbladesData && (
              <CSVLink
                data={sawbladesData}
                filename="Bandsagblad.csv"
                className="btn btn-neutral"
              >
                Download
              </CSVLink>
            )}
          </div>
          <div className="overflow-scroll">
            {fetchData && <FilterTable data={sawblades && sawblades} />}
          </div>
        </div>
      )}
      {openHistorikk && (
        <div className="m-10">
          {openToggle && (
            <div>
              <Checkbox
                sawbladeColumns={historikkColumns}
                setSawbladeColumns={setHistorikkColumns}
                title="Historikk"
              />
            </div>
          )}
          <button
            className="btn my-5 bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => {
              if (Object.values(historikkColumns).some((value) => value)) {
                setFetchData(true);
                setOpenToggle(false);
              } else {
                alert("Velg minst en kolonne!");
              }
            }}
          >
            Hent data historikk
          </button>
          <div className="card-actions justify-end">
            {historikkData && (
              <CSVLink
                data={historikkData}
                filename="Historikk.csv"
                className="btn btn-neutral"
              >
                Download
              </CSVLink>
            )}
          </div>
          <div className="overflow-scroll">
            {fetchData && <FilterTable data={historikk && historikk} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
