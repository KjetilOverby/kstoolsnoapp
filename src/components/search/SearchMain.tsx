/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
// import { DeleteComponent } from "./DeleteComponent";
import { RestoreComponent } from "./RestoreComponent";
import BandDetails from "./BandDetails";
// import DatepickerComponent from "../reusable/Datepicker";
import { api } from "~/utils/api";
import ActivateBlade from "./ActivateBlade";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsClipboardData } from "react-icons/bs";
import { DeleteComponent } from "./DeleteComponent";
import { signIn, signOut, useSession } from "next-auth/react";
import BSFTable from "../reusable/BSFTable";
import RoleAdmin from "../roles/RoleAdmin";
import DatepickerComponent from "../reusable/Datepicker";
import { NewInputComponent } from "../newtools/NewInputComponent";
import { set } from "zod";

interface Blade {
  creatorImg: string | undefined;
  deleterImg: string | undefined;
  deleter: ReactNode;
  type: string;
  IdNummer: string;
  deleted: boolean;
  creator: string;
  updatedAt: Date;
  createdAt: Date;
  id: string;
  kunde: string;
  side: string;
  active: boolean;
  deleteReason: string;
  note: string;
  _count: {
    bandhistorikk: number;
  };

  bandhistorikk: {
    creator: string;

    feilkode: string;
    handling: string;
    historikkId: string;
    id: string;
    datoInn: Date;
    klInn: Date;
    datoUt: Date;
    klUt: Date;
    sagNr: string;
    sagtid: number;
    sideklaring: number;
    anmSag: string;
    updatedAt: Date;
    anmKS: string;
    temperatur: number;
    sgSag: string;
    sgKS: string;
    datoSrv: Date;
    activePost: boolean;
  }[];
}

interface BladeProps {
  sawblades: Blade[];
  deletedSawblades: Blade[];
}

const SearchMain = ({
  sawblades,
  deletedSawblades,
  setCloseSearchComponent,
  closeSearchComponent,
  dateValue,
  setDateValue,
}: BladeProps) => {
  const { data: sessionData } = useSession();

  const [showDeletedBlades, setShowDeletedBlades] = useState(false);

  const [openBandhistorikkData, setOpenBandhistorikkData] = useState(false);

  const [searchSerial, setSearchSerial] = useState<string>("");

  const [openStatus, setOpenStatus] = useState<string | null>(null);
  const [openHistorikk, setopenHistorikk] = useState<string | null>(null);
  const [wasteReasonInput, setWasteReasonInput] = useState("");
  const [openDeleteID, setOpenDeleteID] = useState<string | null>(null);
  const [openGjenopprettID, setOpenGjenopprettID] = useState<string | null>(
    null,
  );

  const [note, setNote] = useState<string>("");

  const [openEditBladeModal, setOpenEditBladeModal] = useState<string | null>(
    null,
  );
  const [bladeTypeSelect, setBladeTypeSelect] = useState("");

  const [countBlades, setCountBlades] = useState();

  const [newBladesCount, setNewBladesCount] = useState();

  const deleteHandler = (postID: string) => {
    setOpenDeleteID(postID);
  };
  const gjenopprettHandler = (postID: string) => {
    setOpenGjenopprettID(postID);
  };

  const editBladeHandler = (postID: string) => {
    setOpenEditBladeModal(postID);
  };

  const ctx = api.useContext();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const createPost = api.bandhistorikk.create.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();

      setOpenStatus(null);
    },
  });

  const updateStatus = api.sawblades.updateStatus.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
    },
  });

  const updatePost = api.bandhistorikk.update.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
    },
  });
  const editSawBlade = api.sawblades.editSawblade.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      setOpenEditBladeModal(null);
    },
  });

  useEffect(() => {
    setCountBlades(sawblades?.filter((item) => item.deleted === false).length);

    setNewBladesCount(sawblades?.length);
  }, [sawblades]);

  return (
    <div className="max-lg:overflow-scroll">
      <div>
        {/* {!closeSearchComponent ? (
          <div>
            <h1 className="text-xl text-neutral">
              Blad i bruk ({countBlades})
            </h1>
            <p className="text-neutral">
              Nye registrerte blad denne perioden: {newBladesCount}
            </p>
          </div>
        ) : (
          ""
        )} */}

        {sawblades?.map((blade) => {
          const statusHandler = (postId: string) => {
            setOpenStatus(postId);
          };

          const handleCloseModal = () => {
            setOpenStatus(null);
          };

          const historikkHandler = (historikkId: string | null) => {
            setopenHistorikk(historikkId);
          };

          const handleCloseHistorikk = () => {
            setTimeout(() => {
              setopenHistorikk(null);
              setCloseSearchComponent(false);
            }, 100);
          };

          const updateStatusHandler = () => {
            void updateStatus.mutate({
              id: blade.id,
              active: true,
            });
          };

          const deactivateStatusHandler = () => {
            void updateStatus.mutate({
              id: blade.id,
              active: false,
            });
          };

          const openHistorikkDataHandler = () => {
            setCloseSearchComponent(true);
            historikkHandler(blade.id);
          };

          const closeDeleteHandler = () => {
            setOpenDeleteID(null);
            setWasteReasonInput("");
          };

          return (
            <>
              <div className="mt-10 flex items-center ">
                {/* {sessionData?.user.role === "ADMIN" && (
                  <div>
                    <div
                      onClick={() => statusHandler(blade.id)}
                      className={`h-8 w-8 rounded-full ${
                        blade.active ? "bg-green-400" : "bg-primary"
                      }`}
                    >
                      {openStatus === blade.id && !blade.active && (
                        <ActivateBlade
                          blade={blade}
                          createPost={createPost}
                          updateStatusHandler={updateStatusHandler}
                          handleCloseModal={handleCloseModal}
                        />
                      )}
                    </div>
                  </div>
                )} */}

                <RoleAdmin>
                  <div className="my-5">
                    <div className="flex">
                      <div>
                        {!blade.deleted && (
                          <button
                            className="btn btn-sm  bg-red-500 text-white hover:bg-red-600"
                            onClick={() => deleteHandler(blade.id)}
                          >
                            SLETT
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => editBladeHandler(blade.id)}
                          className="btn btn-sm  ml-5 bg-warning text-yellow-900 hover:bg-yellow-600"
                        >
                          Rediger blad
                        </button>
                        {openEditBladeModal === blade.id && (
                          <div className="card absolute z-[100]  flex  flex-col  bg-warning p-5 text-white">
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                void editSawBlade.mutate({
                                  id: blade.id,
                                  type: bladeTypeSelect.type || blade.type,
                                  note: note,
                                });
                              }}
                            >
                              <p className="mb-5 text-yellow-800">
                                Rediger blad
                              </p>
                              <div className="mb-5">
                                <label className="text-yellow-800">
                                  Bladtype
                                </label>
                                <NewInputComponent
                                  bladeData={bladeTypeSelect}
                                  setBladeData={setBladeTypeSelect}
                                  value={blade.type}
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-yellow-800">Notat</label>
                                <input
                                  value={note}
                                  className="text-black"
                                  onChange={(e) =>
                                    setNote(e.currentTarget.value)
                                  }
                                  type="text"
                                />
                              </div>
                              <div className="mt-5">
                                <button
                                  onClick={() => setOpenEditBladeModal(null)}
                                  className="btn mr-5 bg-info text-white"
                                >
                                  AVBRYT
                                </button>
                                <button className="btn bg-success text-white">
                                  LAGRE ENDRINGER
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    </div>
                    {openDeleteID === blade.id && (
                      <div className="card absolute right-24 z-[100] flex w-96 flex-col items-center bg-red-500 text-white">
                        <div className="card-body">
                          <h2 className="card-title">
                            Slett blad: {blade.IdNummer}
                          </h2>
                          <p>Velg årsaken til vrak?</p>
                          <select
                            onChange={(e) =>
                              setWasteReasonInput(e.currentTarget.value)
                            }
                            className="select select-bordered select-xs w-full max-w-xs text-black"
                          >
                            <option disabled selected>
                              Velg
                            </option>
                            <option value="Normal slitasje">
                              Normal slitasje
                            </option>
                            <option value="Ikjøring">Ikjøring</option>
                            <option className="Røk av">Røk av</option>
                            <option className="Sprekk">Sprekk</option>
                            <option className="Dårlig stamme">
                              Dårlig stamme
                            </option>
                            <option className="Varmekjørt">Varmekjørt</option>
                            <option className="Store tannskader">
                              Store tannskader
                            </option>
                            <option className="Oppspenningsfeil i sag">
                              Oppspenningsfeil i sag
                            </option>
                          </select>

                          {wasteReasonInput && (
                            <th>
                              <button className="btn btn-xs bg-red-600">
                                <DeleteComponent
                                  wasteReasonInput={wasteReasonInput}
                                  setWasteReasonInput={setWasteReasonInput}
                                  id={blade.id}
                                  closeDeleteHandler={closeDeleteHandler}
                                />
                              </button>
                              <h1>
                                NB: Husk å sette Vrak i BFS koder på historikk.
                              </h1>
                            </th>
                          )}
                        </div>
                        <div className="card-actions my-5  ">
                          <button
                            onClick={closeDeleteHandler}
                            className="btn btn-xs"
                          >
                            Avbryt
                          </button>
                        </div>
                      </div>
                    )}

                    {blade.deleted && (
                      <button
                        onClick={() => gjenopprettHandler(blade.id)}
                        className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                      >
                        Gjenopprett
                      </button>
                    )}

                    {openGjenopprettID === blade.id && (
                      <div className="card absolute right-24 z-[100] grid w-96 items-center text-wrap bg-gray-500 p-5 text-white">
                        <h1 className="mb-5 text-xl">Gjenopprett</h1>
                        <div className="h-auto w-full overflow-auto whitespace-normal ">
                          <p className="">
                            Ved å angre sletting av dette bladet så
                            gjenopprettes statistikk tilbake til det som var før
                            sletting og sletteårsak vil bli fjernet.
                          </p>
                          <br />
                          <p className="text-yellow-200">
                            NB: Husk fjerne vrak i BFS koder på historikk
                          </p>
                        </div>

                        <div className="mt-5">
                          <button className="btn btn-sm bg-green-300 hover:bg-green-500">
                            {" "}
                            <RestoreComponent
                              setOpenGjenopprettID={setOpenGjenopprettID}
                              id={blade.id}
                            />
                          </button>
                          <button
                            onClick={() => setOpenGjenopprettID(null)}
                            className="btn btn-sm "
                          >
                            Avbryt
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </RoleAdmin>
              </div>
              {
                <div className=" z-50 h-auto rounded-2xl bg-base-100  max-lg:relative  md:w-full">
                  <div className="mr-5 flex justify-between">
                    <div>
                      <h1 className="text-2xl font-semibold text-neutral">
                        ID: {blade.IdNummer}{" "}
                        <span className="font-thin text-gray-400">
                          {blade.note && `(${blade.note})`}
                        </span>
                        <span className="text-red-500">
                          {blade.deleted && "VRAKET"}
                        </span>
                      </h1>
                      <p className="text-xs text-neutral">
                        Type: {blade.type} {blade.side}
                      </p>
                      <p className="mb-5 text-xs text-neutral">
                        Antall serviceposter: {blade._count.bandhistorikk}
                      </p>

                      <div className="mb-5 rounded-xl bg-green-200 p-2 text-xs">
                        <p className="">Registrert av: {blade.creator}</p>
                        <p className="mb-3">
                          Dato:
                          {dateFormat(blade.createdAt, "dd.mm.yyyy")}
                        </p>
                        <div className="w-10">
                          <img
                            className="w-full rounded-full"
                            src={blade.creatorImg}
                            alt=""
                          />
                        </div>
                      </div>
                      {blade.deleted && (
                        <div className="mb-5 rounded-xl bg-red-200 p-2 text-xs">
                          <p>Slettet av: {blade.deleter}</p>
                          <p>
                            Dato: {dateFormat(blade.updatedAt, "dd.mm.yyyy")}
                          </p>
                          <p className="mb-3">
                            Vrakårsak: {blade.deleteReason}
                          </p>
                          <div className="w-10">
                            <img
                              className="w-full rounded-full"
                              src={blade.deleterImg}
                              alt=""
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <BSFTable />
                    </div>
                  </div>
                  <BandDetails
                    bandhistorikkData={blade}
                    setOpenBandhistorikkData={setOpenBandhistorikkData}
                    blade={blade}
                    updatePost={updatePost}
                    updateStatusHandler={updateStatusHandler}
                    handleCloseModal={handleCloseModal}
                  />
                </div>
              }
            </>
          );
        })}
      </div>
      <button
        className="btn btn-sm my-5 bg-blue-500 text-white hover:bg-blue-600"
        onClick={() => setShowDeletedBlades(!showDeletedBlades)}
      >
        {showDeletedBlades ? "Skjul slettede blad" : "Vis slettede blad"}
      </button>
      {showDeletedBlades && (
        <div>
          <h1 className="mb-5 text-xl text-neutral">
            Slettede blad {deletedSawblades?.length}
          </h1>
          <div className="shadow-xl">
            <DatepickerComponent
              setDateValue={setDateValue}
              dateValue={dateValue}
            />
          </div>
          <table className="table table-xs whitespace-nowrap bg-base-100">
            <thead>
              <tr className="border border-b-primary border-l-base-100 border-r-base-100 border-t-primary">
                <th className="text-sm text-neutral">ID</th>
                <th className="text-sm text-neutral">Type</th>

                {/* <th className="text-sm text-neutral">Opprettet av</th> */}
                <th className="text-sm text-neutral">Slettet av</th>
                <th className="text-sm text-neutral">Dato slettet</th>
                <th className="text-sm text-neutral">Årsak</th>
              </tr>
            </thead>
            <tbody>
              {deletedSawblades?.map((blade) => {
                return (
                  <>
                    {blade.deleted && (
                      <tr className="border border-base-100 bg-base-100 hover:bg-primary">
                        <td className="py-5 font-bold text-neutral">
                          {blade.IdNummer}{" "}
                          {blade.note && (
                            <span className="text-xs font-normal text-orange-600">
                              ({blade.note})
                            </span>
                          )}
                        </td>
                        <td className="py-5">
                          <div className="flex items-center space-x-3">
                            <div className="avatar"></div>
                            <div>
                              <div className="text-xs text-neutral">
                                {blade.type} {blade.side}
                              </div>
                            </div>
                          </div>
                        </td>
                        {/*   <td className="flex items-center">
                          <div className="mr-2 h-5 w-5">
                            <img
                              className="rounded-full"
                              src={blade.creatorImg}
                              alt=""
                            />
                          </div>
                          {blade.creator}
                        </td> */}

                        <td className="flex items-center py-5">
                          <div className="mr-2 h-5 w-5">
                            <img
                              className="rounded-full"
                              src={blade.deleterImg}
                              alt=""
                            />
                          </div>
                          {blade.deleter}
                        </td>
                        <td className="py-5">
                          <div className="flex items-center space-x-3">
                            <div className="text-xs text-neutral">
                              {dateFormat(
                                blade.updatedAt,
                                "dd.mm.yyyy , HH:MM",
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-5">{blade.deleteReason}</td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchMain;
