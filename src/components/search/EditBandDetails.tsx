/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { api } from "~/utils/api";

interface detailProps {
  historikkData: {
    sagNr: string;
    datoInn: Date;
    klInn: Date;
    datoUt: Date;
    klUt: Date;
    sagtid: number;
    feilkode: string;
    anmSag: string;
    temperatur: number;
    sgSag: string;
    activatePost: boolean;
    id: string;
    ampere: number;
  };
  setHistorikkData: React.Dispatch<
    React.SetStateAction<{
      datoInn: Date;
      klInn: Date;
      datoUt: Date;
      klUt: Date;
      sagtid: number;
      feilkode: string;
      bladedata: string;
      anmSag: string;
      anTimer: number;
      temperatur: number;
      sgSag: string;
      activePost: boolean;
      sagNr: string;
      ampere: number;
    }>
  >;
  postId: string;
}

const EditBandDetails = ({
  setOpenEditBandDetails,
  postId,
  setHistorikkData,
  historikkData,
}: detailProps) => {
  const ctx = api.useContext();
  const updateBandhistorikk = api.bandhistorikk.update.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      setOpenEditBandDetails(false);
    },
  });

  return (
    <div className="absolute z-40">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateBandhistorikk.mutate({
            id: postId,
            sagNr: historikkData.sagNr,
            datoInn: historikkData.datoInn,
            klInn: historikkData.klInn,
            datoUt: historikkData.datoUt,
            klUt: historikkData.klUt,
            sagtid: historikkData.sagtid,
            feilkode: historikkData.feilkode,
            anmSag: historikkData.anmSag,
            temperatur: historikkData.temperatur,
            sgSag: historikkData.sgSag,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            activePost: historikkData.activePost,
            ampere: historikkData.ampere,
            creator2: "",
            creatorImg2: "",
          });
        }}
        className="card w-96 bg-base-100 text-neutral shadow-2xl"
      >
        <div className="card-body ">
          <h2 className="card-title">Rediger data</h2>
          <div>
            <p>Sag nr:</p>
            <select
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  sagNr: e.currentTarget.value,
                })
              }
              value={historikkData.sagNr}
              className="select select-bordered select-xs w-full max-w-xs bg-white"
            >
              <option value="">Velg</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
          {/* <div>
            <p>Innpostningsdato:</p>
            <input
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  datoInn: new Date(e.currentTarget.value),
                })
              }
              type="date"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
              value={historikkData.datoInn}
            />
          </div> */}
          {/* <div>
            <p>Klokkeslett inn:</p>
            <input
              onChange={(e) => {
                const [hours, minutes] = e.currentTarget.value.split(":");
                const updatedDate = new Date(historikkData.klInn);
                updatedDate.setHours(Number(hours));
                updatedDate.setMinutes(Number(minutes));
                updatedDate.setSeconds(0); // Optionally, set seconds to 0
                setHistorikkData({
                  ...historikkData,
                  klInn: updatedDate,
                });
              }}
              type="time"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
              value={historikkData.klInn}
            />
          </div> */}
          {/* <div>
            <p>Utpostningsdato:</p>
            <input
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  datoUt: new Date(e.currentTarget.value),
                })
              }
              type="date"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
              value={historikkData.datoUt}
            />
          </div> */}
          {/* <div>
            <p>Klokkeslett ut:</p>
            <input
              onChange={(e) => {
                const [hours, minutes] = e.currentTarget.value.split(":");
                const updatedDate = new Date(historikkData.klInn);
                updatedDate.setHours(Number(hours));
                updatedDate.setMinutes(Number(minutes));
                updatedDate.setSeconds(0); // Optionally, set seconds to 0
                setHistorikkData({
                  ...historikkData,
                  klUt: updatedDate,
                });
              }}
              type="time"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
              value={historikkData.klUt}
            />
          </div> */}
          <div>
            <p>Antall timer:</p>
            <input
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  sagtid: Number(e.currentTarget.value),
                })
              }
              type="number"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
              value={historikkData.sagtid}
            />
          </div>
          <div>
            <p>Temperatur:</p>
            <input
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  temperatur: Number(e.currentTarget.value),
                })
              }
              type="number"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
              value={historikkData.temperatur}
            />
          </div>
          <div>
            <p>Ampere:</p>
            <input
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  ampere: Number(e.currentTarget.value),
                })
              }
              type="text"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
              value={historikkData.ampere}
            />
          </div>
          <div>
            <p>Anm sag:</p>
            <input
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  anmSag: e.currentTarget.value,
                })
              }
              type="text"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
              value={historikkData.anmSag}
            />
          </div>
          <div>
            <p>Feilkode:</p>
            <select
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  feilkode: e.currentTarget.value,
                })
              }
              className="select select-bordered select-xs w-full max-w-xs bg-white"
              value={historikkData.feilkode}
            >
              <option value="Ingen anmerkning">Ingen anmerkning</option>
              <option value="Bølger">Bølger</option>
              <option value="Vandrer på hjul">Vandrer på hjul</option>
              <option value="Sprekk">Sprekk</option>
              <option value="Tannbrudd">Tannbrudd</option>
              <option value="Sponpåliming">Sponpåliming</option>
              <option value="Sløv">Sløv</option>
              <option value="Riper">Riper</option>
              <option value="Ytre faktorer">Ytre faktorer</option>
              <option value="Reklamasjon">Reklamasjon</option>
              <option value="Havari">Havari</option>
              <option value="Ikjøring">Ikjøring</option>
              <option value="Riper/bølger">Riper/bølger</option>
              <option value="Riper/sprekk">Riper/sprekk</option>
              <option value="Riper/vandrer">Riper/vandrer</option>
              <option value="Bølger/sprekk">Bølger/sprekk</option>
              <option value="Bølger/vandrer">Bølger/vandrer</option>
              <option value="Ikjøring/riper">Ikjøring/riper</option>
            </select>
          </div>
          <div>
            <p>Signatur:</p>
            <input
              value={historikkData.sgSag}
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  sgSag: e.currentTarget.value,
                })
              }
              type="text"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
            />
          </div>

          <div className="card-actions">
            <button className="btn btn-primary btn-xs">Lagre</button>
            <button
              onClick={() => setOpenEditBandDetails(false)}
              className="btn btn-xs"
            >
              Avbryt
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBandDetails;
