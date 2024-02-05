/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState } from "react";
import DatepickerComponent from "~/components/reusable/Datepicker";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import SearchMain from "~/components/search/SearchMain";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import NotAuthorized from "~/components/reusable/NotAuthorized";

const Search = ({ theme }) => {
  const [closeSearchComponent, setCloseSearchComponent] = useState(false);
  const { data: sessionData } = useSession();
  const [dateValue, setDateValue] = useState({
    endDate: "2040-01-14",
    startDate: "2023-12-01",
  });
  const [idValue, setIdValue] = useState("");

  const { data: sawblades } = api.sawblades.getAll.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
  });

  const { data: deletedSawblades } = api.sawblades.getAllDeleted.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
  });
  const { data: sawbladeslActive } = api.sawblades.getActive.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
    init: "MØ",
  });

  const { data: sawbladesOsterdal } = api.sawblades.getCustomer.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
    init: "MØ",
  });
  const { data: sawbladesOsterdalDeleted } =
    api.sawblades.getCustomerAllDeleted.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      IdNummer: idValue,
      init: "MØ",
    });
  const { data: sawbladesOsterdalActive } =
    api.sawblades.getCustomerActive.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      IdNummer: idValue,
      init: "MØ",
    });

  return (
    <div data-theme={theme}>
      {sessionData?.user.role === "ADMIN" ||
      sessionData?.user.role === "MO_ADMIN" ? (
        <>
          <HeaderComponent />
          <div className="mx-5 min-h-screen bg-base-100 p-5 md:max-lg:p-0 xl:mx-48">
            <div className="rounded-xl bg-base-100 shadow-xl">
              {!closeSearchComponent ? (
                <div className="mb-5 w-96 rounded-xl bg-base-100 p-5">
                  <DatepickerComponent
                    setDateValue={setDateValue}
                    dateValue={dateValue}
                  />
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
              <SearchMain
                sawblades={sawblades}
                deletedSawblades={deletedSawblades}
                activeBlades={sawbladeslActive}
                closeSearchComponent={closeSearchComponent}
                setCloseSearchComponent={setCloseSearchComponent}
              />
            )}
            {sessionData?.user.role === "MO_ADMIN" && (
              <SearchMain
                sawblades={sawbladesOsterdal}
                deletedSawblades={sawbladesOsterdalDeleted}
                activeBlades={sawbladesOsterdalActive}
                closeSearchComponent={closeSearchComponent}
                setCloseSearchComponent={setCloseSearchComponent}
              />
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
