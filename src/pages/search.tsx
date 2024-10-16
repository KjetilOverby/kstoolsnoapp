/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useEffect } from "react";
import DatepickerComponent from "~/components/reusable/Datepicker";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import dateFormat from "dateformat";
import SearchMain from "~/components/search/SearchMain";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import NotAuthorized from "~/components/reusable/NotAuthorized";
import CountOverview from "~/components/search/CountOverview";

const Search = ({ theme }) => {
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  const [dateValue, setDateValue] = useState({
    endDate: dateFormat(new Date(), "yyyy-mm-dd"),
    startDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });
  const [closeSearchComponent, setCloseSearchComponent] = useState(false);
  const { data: sessionData } = useSession();

  const [idValue, setIdValue] = useState("");
  const [openIngenHandling, setOpenIngenHandling] = useState(false);
  const [KundeId, setKundeId] = useState("");

  console.log("id: " + idValue);
  console.log("kunde: " + KundeId);

  useEffect(() => {
    if (sessionData?.user.role === "ADMIN") {
      setKundeId("");
    } else if (sessionData?.user.role === "MO_ADMIN") {
      setKundeId("MØ");
    } else if (sessionData?.user.role === "MM_ADMIN") {
      setKundeId("MM");
    }
  }, [sessionData]);

  const { data: countAllBlades } = api.sawblades.countAllBlades.useQuery({});
  const { data: countAllBladesCustomer } =
    api.sawblades.countAllBladesCustomer.useQuery({
      init: KundeId,
    });
  const { data: countAllHistorikk } =
    api.bandhistorikk.countAllHistorikk.useQuery({});
  const { data: countAllHistorikkCustomer } =
    api.bandhistorikk.countAllHistorikkCustomer.useQuery({
      init: KundeId,
    });

  const { data: countAllSagtid } = api.bandhistorikk.countAllSagtid.useQuery(
    {},
  );
  const { data: countAllSagtidCustomer } =
    api.bandhistorikk.countAllSagtidCustomer.useQuery({
      init: KundeId,
    });
  const { data: sawblades } = api.sawblades.getAll.useQuery({
    IdNummer: idValue,
  });
  const { data: sawbladesIngenHandling } =
    api.sawblades.getAllIngenHandling.useQuery({});

  const { data: deletedSawblades } = api.sawblades.getAllDeleted.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
  });
  const { data: sawbladeslActive } = api.sawblades.getActive.useQuery({
    IdNummer: idValue,
    init: KundeId,
  });

  const { data: sawbladesOsterdal } = api.sawblades.getCustomer.useQuery({
    IdNummer: idValue,
    init: KundeId,
  });
  const { data: sawbladesOsterdalDeleted } =
    api.sawblades.getCustomerAllDeleted.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      IdNummer: idValue,
      init: KundeId,
    });
  const { data: sawbladesOsterdalActive } =
    api.sawblades.getCustomerActive.useQuery({
      IdNummer: idValue,
      init: KundeId,
    });
  // const [dateValue, setDateValue] = useState({
  //   endDate: "2040-01-14",
  //   startDate: "2023-12-01",
  // });
  // const [idValue, setIdValue] = useState("");

  // const { data: sawblades } = api.sawblades.getAll.useQuery({
  //   date: `${dateValue.endDate}T23:59:59.000Z`,
  //   date2: `${dateValue.startDate}T00:00:00.000Z`,
  //   IdNummer: idValue,
  // });

  // const { data: deletedSawblades } = api.sawblades.getAllDeleted.useQuery({
  //   date: `${dateValue.endDate}T23:59:59.000Z`,
  //   date2: `${dateValue.startDate}T00:00:00.000Z`,
  //   IdNummer: idValue,
  // });
  // const { data: sawbladeslActive } = api.sawblades.getActive.useQuery({
  //   date: `${dateValue.endDate}T23:59:59.000Z`,
  //   date2: `${dateValue.startDate}T00:00:00.000Z`,
  //   IdNummer: idValue,
  //   init: "MØ",
  // });

  // const { data: sawbladesOsterdal } = api.sawblades.getCustomer.useQuery({
  //   date: `${dateValue.endDate}T23:59:59.000Z`,
  //   date2: `${dateValue.startDate}T00:00:00.000Z`,
  //   IdNummer: idValue,
  //   init: "MØ",
  // });
  // const { data: sawbladesOsterdalDeleted } =
  //   api.sawblades.getCustomerAllDeleted.useQuery({
  //     date: `${dateValue.endDate}T23:59:59.000Z`,
  //     date2: `${dateValue.startDate}T00:00:00.000Z`,
  //     IdNummer: idValue,
  //     init: "MØ",
  //   });
  // const { data: sawbladesOsterdalActive } =
  //   api.sawblades.getCustomerActive.useQuery({
  //     date: `${dateValue.endDate}T23:59:59.000Z`,
  //     date2: `${dateValue.startDate}T00:00:00.000Z`,
  //     IdNummer: idValue,
  //     init: "MØ",
  //   });

  return (
    <div data-theme={theme}>
      {sessionData?.user.role === "ADMIN" ||
      sessionData?.user.role === "MO_ADMIN" ||
      "MM_ADMIN" ? (
        <>
          <HeaderComponent />
          <div className="min-h-screen bg-base-100 p-2 md:mx-5 md:p-5 md:max-lg:p-0 xl:mx-48">
            <div className="rounded-xl bg-base-100 shadow-xl">
              {!closeSearchComponent ? (
                <div className="mb-5 rounded-xl bg-base-100 p-5 md:w-96">
                  {/* <DatepickerComponent
                    setDateValue={setDateValue}
                    dateValue={dateValue}
                  /> */}
                  <div className="flex flex-col">
                    <label>Søk</label>
                    <input
                      value={idValue}
                      onChange={(e) => setIdValue(e.currentTarget.value)}
                      type="text"
                      placeholder="Skriv id nummer"
                      className="input input-bordered input-xs w-full max-w-xs bg-base-100"
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            {sessionData?.user.role === "ADMIN" && (
              <>
                <div className="flex flex-col md:flex-row">
                  <CountOverview
                    countAllBlades={countAllBlades}
                    countAllHistorikk={countAllHistorikk}
                    countAllSagtid={countAllSagtid}
                  />
                  <div>
                    <p className="text-[.7rem] italic md:text-xs">
                      Blad Ingen Handling({sawbladesIngenHandling?.length}):{" "}
                    </p>
                    <table className="mb-4 w-full cursor-pointer border border-primary md:mb-0">
                      <thead>
                        <tr>
                          <th className="text-left text-xs italic text-neutral">
                            IdNummer
                          </th>
                          <th className="text-rneutral text-left text-xs italic">
                            Type
                          </th>
                          <th className="text-left text-xs italic text-neutral">
                            Feilkode
                          </th>
                          <th className="text-left text-xs italic text-neutral">
                            Sag
                          </th>
                          <th className="text-left text-xs italic text-neutral">
                            Timer
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sawbladesIngenHandling?.map((sawblade) => {
                          const lastPost =
                            sawblade.bandhistorikk[
                              sawblade.bandhistorikk.length - 1
                            ];
                          return (
                            <tr
                              onClick={() => setIdValue(sawblade.IdNummer)}
                              key={sawblade.id}
                              className="cursor-pointer border hover:bg-primary hover:text-white"
                            >
                              <td className="border border-primary p-1 text-xs italic text-neutral">
                                {sawblade.IdNummer}
                              </td>
                              <td className="border border-primary p-1 text-xs italic text-neutral">
                                {sawblade.type} {sawblade.side}
                              </td>
                              {lastPost ? (
                                <>
                                  <td className="border border-primary p-1 text-xs italic text-neutral">
                                    {lastPost.feilkode}
                                  </td>
                                  <td className="border border-primary p-1 text-xs italic text-neutral">
                                    {lastPost.sagNr}{" "}
                                    {lastPost.sagNr % 2 === 0 ? "H" : "V"}
                                  </td>
                                  <td className="border border-primary p-1 text-xs italic text-neutral">
                                    {lastPost.sagtid}
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="border border-primary p-1 text-xs italic text-neutral">
                                    N/A
                                  </td>
                                  <td className="border border-primary p-1 text-xs italic text-neutral">
                                    N/A
                                  </td>
                                  <td className="border border-primary p-1 text-xs italic text-neutral">
                                    N/A
                                  </td>
                                </>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <SearchMain
                  sawblades={sawblades}
                  deletedSawblades={deletedSawblades}
                  activeBlades={sawbladeslActive}
                  closeSearchComponent={closeSearchComponent}
                  setCloseSearchComponent={setCloseSearchComponent}
                  sawbladesIngenHandling={sawbladesIngenHandling}
                  openIngenHandling={openIngenHandling}
                  dateValue={dateValue}
                  setDateValue={setDateValue}
                />
              </>
            )}
            {sessionData?.user.role === "MO_ADMIN" && (
              <>
                <CountOverview
                  countAllBlades={countAllBladesCustomer}
                  countAllHistorikk={countAllHistorikkCustomer}
                  countAllSagtid={countAllSagtidCustomer}
                />
                <SearchMain
                  sawblades={sawbladesOsterdal}
                  deletedSawblades={sawbladesOsterdalDeleted}
                  activeBlades={sawbladesOsterdalActive}
                  closeSearchComponent={closeSearchComponent}
                  setCloseSearchComponent={setCloseSearchComponent}
                  dateValue={dateValue}
                  setDateValue={setDateValue}
                />
              </>
            )}
            {sessionData?.user.role === "MM_ADMIN" && (
              <>
                <CountOverview
                  countAllBlades={countAllBladesCustomer}
                  countAllHistorikk={countAllHistorikkCustomer}
                  countAllSagtid={countAllSagtidCustomer}
                />
                <SearchMain
                  sawblades={sawbladesOsterdal}
                  deletedSawblades={sawbladesOsterdalDeleted}
                  activeBlades={sawbladesOsterdalActive}
                  closeSearchComponent={closeSearchComponent}
                  setCloseSearchComponent={setCloseSearchComponent}
                  dateValue={dateValue}
                  setDateValue={setDateValue}
                />
              </>
            )}
          </div>
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
};

export default Search;
