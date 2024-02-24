// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import { api } from "~/utils/api";

interface historikkInputProps {
  postId: string;
  setOpenBandhistorikkData: React.Dispatch<React.SetStateAction<boolean>>;

  historikkKs: {
    anmKS: string;
    handling: string;
    sgKS: string;
    datoSrv: Date;
    sideklaring: number;
  };
  setOpenInputKS: React.Dispatch<React.SetStateAction<boolean>>;
  setHistorikkKs: React.Dispatch<
    React.SetStateAction<{
      anmKS: string;
      sgKS: string;
      datoSrv: Date;
      handling: string;
      sideklaring: number;
    }>
  >;
}

const HistorikkInputKS = ({
  postId,
  historikkKs,
  setHistorikkKs,
  setOpenInputKS,
}: historikkInputProps) => {
  const ctx = api.useContext();

  const updatePost = api.bandhistorikk.updateKS.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      setOpenInputKS(false);
    },
  });

  const [bfsValue, setBfsValue] = useState({
    bfs1: "",
    bfs2: "",
    bfs3: "",
    bfs4: "",
    bfs5: "",
    bfs6: "",
    vrak: "",
  });

  const nonEmptyValues = Object.values(bfsValue).filter(
    (value) => value !== "",
  );
  const concatenatedString = nonEmptyValues.join(", ") || "Ingen handling";

  return (
    <div className="absolute z-40">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (concatenatedString === "Ingen handling") {
            alert("Du må velge minst en BFS kode");
          } else {
            void updatePost.mutate({
              id: postId,
              anmKS: historikkKs.anmKS,
              handling: concatenatedString,
              sgKS: historikkKs.sgKS,
              datoSrv: historikkKs.datoSrv,
              sideklaring: historikkKs.sideklaring,
              creator3: "",
              creatorImg3: "",
            });
          }
        }}
        className="card w-96 bg-base-100 text-neutral shadow-2xl"
      >
        <div className="card-body">
          <h2 className="card-title">Oppdater post</h2>
          <div>
            <p>Servicedato:</p>
            <input
              onChange={(e) =>
                setHistorikkKs({
                  ...historikkKs,
                  datoSrv: new Date(e.currentTarget.value),
                })
              }
              type="date"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
            />
          </div>

          <div>
            <p>Anm K&S:</p>
            <input
              value={historikkKs.anmKS}
              onChange={(e) =>
                setHistorikkKs({
                  ...historikkKs,
                  anmKS: e.currentTarget.value,
                })
              }
              type="text"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
            />
          </div>
          <div>
            <p>Sideklaring:</p>
            <select
              onChange={(e) =>
                setHistorikkKs({
                  ...historikkKs,
                  sideklaring: Number(e.currentTarget.value),
                })
              }
              className="select select-bordered select-xs w-full max-w-xs bg-white"
            >
              <option value={0}>Velg</option>
              <option value={0.4}>0.4</option>
              <option value={0.45}>0.45</option>
              <option value={0.5}>0.5</option>
              <option value={0.55}>0.55</option>
              <option value={0.6}>0.6</option>
              <option value={0.65}>0.65</option>
              <option value={0.7}>0.7</option>
            </select>
          </div>
          <p>BFS koder</p>
          <div className="rounded-xl border border-neutral p-1">
            <label className="label cursor-pointer">
              <span className="label-text">BFS423</span>
              <input
                onChange={(e) =>
                  setBfsValue({
                    ...bfsValue,
                    bfs1: e.currentTarget.checked ? e.currentTarget.value : "",
                  })
                }
                type="checkbox"
                className="checkbox"
                value="BFS423"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">BFS426</span>
              <input
                onChange={(e) =>
                  setBfsValue({
                    ...bfsValue,
                    bfs2: e.currentTarget.checked ? e.currentTarget.value : "",
                  })
                }
                type="checkbox"
                className="checkbox"
                value="BFS426"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">BFS427</span>
              <input
                onChange={(e) =>
                  setBfsValue({
                    ...bfsValue,
                    bfs3: e.currentTarget.checked ? e.currentTarget.value : "",
                  })
                }
                value="BFS427"
                type="checkbox"
                className="checkbox"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">BFS429</span>
              <input
                onChange={(e) =>
                  setBfsValue({
                    ...bfsValue,
                    bfs4: e.currentTarget.checked ? e.currentTarget.value : "",
                  })
                }
                value="BFS429"
                type="checkbox"
                className="checkbox"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">BFS438</span>
              <input
                onChange={(e) =>
                  setBfsValue({
                    ...bfsValue,
                    bfs5: e.currentTarget.checked ? e.currentTarget.value : "",
                  })
                }
                value="BFS438"
                type="checkbox"
                className="checkbox"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">BFS442</span>
              <input
                onChange={(e) =>
                  setBfsValue({
                    ...bfsValue,
                    bfs6: e.currentTarget.checked ? e.currentTarget.value : "",
                  })
                }
                value="BFS442"
                type="checkbox"
                className="checkbox"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">Vrak</span>
              <input
                onChange={(e) =>
                  setBfsValue({
                    ...bfsValue,
                    vrak: e.currentTarget.checked ? e.currentTarget.value : "",
                  })
                }
                value="Vrak"
                type="checkbox"
                className="checkbox"
              />
            </label>
          </div>

          <div>
            <p>Sign:</p>
            <input
              value={historikkKs.sgKS}
              onChange={(e) =>
                setHistorikkKs({
                  ...historikkKs,
                  sgKS: e.currentTarget.value,
                })
              }
              type="text"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
            />
          </div>

          <div className="card-actions">
            <button className="btn btn-primary btn-xs">Lagre</button>
            <button
              onClick={() => setOpenInputKS(false)}
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

export default HistorikkInputKS;
