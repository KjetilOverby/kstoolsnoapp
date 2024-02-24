/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { api } from "~/utils/api";
import dateFormat from "dateformat";
import CreatePost from "~/components/newtools/CreatePost";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import DatepickerComponent from "~/components/reusable/Datepicker";
import Deleteblades from "~/components/newtools/deleteblades";
import { signIn, signOut, useSession } from "next-auth/react";
import NotAuthorized from "~/components/reusable/NotAuthorized";
const Newtools = ({ theme, setTheme }) => {
  const { data: sessionData } = useSession();

  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  const [dateValue, setDateValue] = useState({
    endDate: dateFormat(new Date(), "yyyy-mm-dd"),
    startDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });

  const [idValue, setIdValue] = useState("");
  const [openDeleteID, setOpenDeleteID] = useState<string | null>(null);

  const deleteHandler = (postID: string) => {
    setOpenDeleteID(postID);
  };

  const { data } = api.sawblades.getAllcreate.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
  });

  return (
    <div data-theme={theme}>
      {sessionData?.user.role === "ADMIN" ? (
        <>
          <HeaderComponent setTheme={setTheme} />

          <div className="mx-5 min-h-screen bg-base-100 p-5 md:max-lg:p-0 xl:mx-48">
            <div className="overflow-x-auto px-5 pt-5">
              <div className="flex flex-col py-5 md:flex-row md:max-lg:grid md:max-lg:h-5/6">
                <CreatePost />
                <div className="mt-5 rounded-xl bg-base-100 p-5 shadow-xl md:ml-5 md:mt-0 md:max-lg:ml-0">
                  <DatepickerComponent
                    setDateValue={setDateValue}
                    dateValue={dateValue}
                  />
                  <div className="flex flex-col">
                    <label>ID nummer</label>
                    <input
                      onChange={(e) => setIdValue(e.currentTarget.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered input-xs w-full max-w-xs bg-primary"
                    />
                  </div>
                </div>
              </div>
              <h1 className="mb-3 py-5 text-neutral">
                Registrerte blad i perioden: {data?.length}
              </h1>
              <table className="table table-xs whitespace-nowrap border border-b-accent border-l-base-100 border-r-base-100 border-t-accent bg-base-100">
                <thead>
                  <tr>
                    <th className=" text-sm text-neutral">Serienummer</th>
                    <th className=" text-sm text-neutral">Type</th>
                    <th className=" text-sm text-neutral">Dato</th>

                    <th className=" text-sm text-neutral">Opprettet av</th>
                    <th className=" text-sm text-neutral"></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((blade) => {
                    return (
                      <>
                        <tr className="border border-base-100  bg-base-100 hover:bg-primary">
                          <td className="py-5 font-bold text-neutral">
                            {blade.IdNummer}{" "}
                            {blade.note && (
                              <span className="text-xs font-normal text-orange-600">
                                ({blade.note})
                              </span>
                            )}
                          </td>
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="avatar"></div>
                              <div>
                                <div className="py-5 text-xs text-neutral">
                                  {blade.type} {blade.side}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="avatar"></div>
                              <div>
                                <div className="py-5 text-xs text-neutral">
                                  {dateFormat(
                                    blade.updatedAt,
                                    "dd.mm.yyyy , HH:MM",
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-5 text-neutral">
                            <td className="flex items-center">
                              <div className="mr-2 h-5 w-5">
                                <img
                                  className="rounded-full"
                                  src={blade.creatorImg}
                                  alt=""
                                />
                              </div>
                              {blade.creator}
                            </td>
                          </td>

                          <td>
                            <button
                              className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                              onClick={() => deleteHandler(blade.id)}
                            >
                              SLETT
                            </button>
                            {openDeleteID === blade.id && (
                              <th className="">
                                <div className="card absolute bottom-5 right-28 z-50 flex bg-red-500 p-5 text-white">
                                  <h1 className="mb-5 text-lg">
                                    Slett {blade.IdNummer}?
                                  </h1>
                                  <p className="mb-3">
                                    Slettingen er permanent og kan ikke angres.
                                  </p>
                                  <p className="mb-5">
                                    Bladet vil ikke legge seg i statistikk for
                                    slettede blad.
                                  </p>

                                  <div className="flex">
                                    <button
                                      onClick={() => setOpenDeleteID(null)}
                                      className="btn btn-sm mr-5"
                                    >
                                      Avbryt
                                    </button>
                                    <Deleteblades blade={blade.id} />
                                  </div>
                                </div>
                              </th>
                            )}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
};

export default Newtools;
