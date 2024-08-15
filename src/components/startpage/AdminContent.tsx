/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import DatepickerComponent from "../reusable/Datepicker";
import dateFormat from "dateformat";

const AdminContent = ({
  newblades,
  deletedblades,
  servicepost,
  servicepostKS,
  dateValue,
  setDateValue,
  servicepostUpdate,
}) => {
  return (
    <>
      <div className="min-h-screen bg-base-100 pb-10 pt-24 md:px-20 2xl:px-96">
        <div className="w-48 md:w-[24rem]">
          <img
            className="w-full"
            src="https://lh3.googleusercontent.com/pw/AP1GczO19apGy2A8BpjpXfSxH9QqnIHayFE3D79I2fFrdmwJNHOHpn6q7T6w9AWxC6w5xkY-_CYbwYSuasGM8ppssCBtuLEz1m_mRsT8ttP5rHf_cHK153cz89ehUYEUpXKfetsUMRKUuYy0hMhZ2xLoPyR0=w1920-h193-s-no?authuser=0"
            alt=""
          />
        </div>

        <div className="mt-10">
          <DatepickerComponent
            setDateValue={setDateValue}
            dateValue={dateValue}
          />
          <p>Aktivitet i gitt periode</p>
          <div>
            <h1 className="my-3 text-xs font-bold text-gray-500 md:text-lg">
              Blad lagt til:
            </h1>
            {newblades?.map((blade) => {
              return (
                <div key={blade.id}>
                  <ul>
                    <div className="mb-2 flex items-center">
                      <img
                        className="mr-3 w-5 rounded-full"
                        src={blade.creatorImg}
                        alt=""
                      />
                      <li className="mb-3 text-[0.55rem] text-gray-500 md:mb-0 md:text-xs">
                        {dateFormat(blade.createdAt, "dd.mm.yyyy, HH:MM")} -{" "}
                        <span className="text-blue-500">{blade.creator}</span>{" "}
                        har lagt til{" "}
                        <span className="text-red-500">
                          {blade.type} {blade.side}
                        </span>{" "}
                        for{" "}
                        <span className="text-purple-500">{blade.kunde}</span>,
                        id nr:{" "}
                        <span className="text-green-500">{blade.IdNummer}</span>
                      </li>
                    </div>
                  </ul>
                </div>
              );
            })}
          </div>
          <div>
            <h1 className="my-3 text-xs font-bold text-gray-500 md:text-lg">
              Blad slettet:
            </h1>
            {deletedblades?.map((blade) => {
              return (
                <div key={blade.id}>
                  <ul>
                    <div className="mb-2 flex items-center">
                      <img
                        className="mr-3 w-5 rounded-full"
                        src={blade.deleterImg}
                        alt=""
                      />
                      <li className="mb-3 text-[0.55rem] text-gray-500 md:mb-0 md:text-xs">
                        {dateFormat(blade.updatedAt, "dd.mm.yyyy, HH:MM")} -{" "}
                        <span className="text-blue-500">{blade.deleter}</span>{" "}
                        har slettet{" "}
                        <span className="text-red-500">
                          {blade.type} {blade.side}
                        </span>{" "}
                        . Sletteårsak:
                        <span className="text-orange-500">
                          {" "}
                          {blade.deleteReason},{" "}
                        </span>
                        for{" "}
                        <span className="text-purple-500">{blade.kunde}</span>,
                        id nr:{" "}
                        <span className="text-green-500">{blade.IdNummer}</span>
                      </li>
                    </div>
                  </ul>
                </div>
              );
            })}
          </div>
          <div>
            <h1 className="my-3 text-xs font-bold text-gray-500 md:text-lg">
              Serviceposter:
            </h1>
            {servicepost?.map((blade) => {
              return (
                <div key={blade.id}>
                  <ul>
                    <div className="mb-2 flex items-center">
                      <img
                        className="mr-3 w-5 rounded-full"
                        src={blade.creatorImg}
                        alt=""
                      />
                      <li className="mb-3 text-[0.55rem] text-gray-500 md:mb-0 md:text-xs">
                        {dateFormat(blade.createdAt, "dd.mm.yyyy, HH:MM")} -{" "}
                        <span className="text-blue-500"> {blade.creator}</span>{" "}
                        har lagt til servicepost for{" "}
                        <span className="text-red-500">
                          {blade.bladType} {blade.side}
                        </span>{" "}
                        med feilkode:{" "}
                        <span className="text-yellow-600">
                          {blade.feilkode}
                        </span>{" "}
                        , sagnummer:{" "}
                        <span className="text-orange-600">{blade.sagNr}</span> ,{" "}
                        {blade.anmSag && (
                          <>
                            Kommentar:{" "}
                            <span className="text-blue-600">
                              {" "}
                              ({blade.anmSag})
                            </span>
                            ,{" "}
                          </>
                        )}
                        id nr:{" "}
                        <span className="text-green-500">
                          {blade.bladeRelationId}
                        </span>
                      </li>
                    </div>
                  </ul>
                </div>
              );
            })}
          </div>
          {/* <div>
            <h1 className="mb-3 mt-10 font-bold">Serviceposter endret:</h1>
            {servicepostUpdate?.map((blade) => {
              return (
                <div key={blade.id}>
                  <ul>
                    <div className="mb-2 flex items-center">
                      <img
                        className="mr-3 w-5 rounded-full"
                        src={blade.creatorImg2}
                        alt=""
                      />
                      <li className="text-xs text-neutral">
                        {dateFormat(blade.updatedAt, "dd.mm.yyyy, HH:MM")} -{" "}
                        <span className="text-blue-500">
                          {" "}
                          {blade.sgSag ? blade.sgSag : blade.creator2}
                        </span>{" "}
                        har endret servicepost for{" "}
                        <span className="text-red-500">
                          {blade.bladType} {blade.side}
                        </span>{" "}
                        med service: {blade.service} og id nummer:{" "}
                        <span className="text-green-500">
                          {blade.bladeRelationId}
                        </span>
                        {blade.anmSag && (
                          <span> Kommentar: {blade.anmSag}</span>
                        )}
                      </li>
                    </div>
                  </ul>
                </div>
              );
            })}
          </div> */}
          <div>
            <h1 className="my-3 text-xs font-bold text-gray-500 md:text-lg">
              Handling Kvarnstrands & Stridsbergs:
            </h1>
            {servicepostKS?.map((blade) => {
              return (
                <div key={blade.id}>
                  <ul>
                    <div className="mb-2 flex items-center">
                      {blade.creator3 && (
                        <>
                          <img
                            className="mr-3 w-5 rounded-full"
                            src={blade.creatorImg3}
                            alt=""
                          />
                          <li className="mb-3 text-[0.55rem] text-gray-500 md:mb-0 md:text-xs">
                            {dateFormat(blade.datoSrv, "dd.mm.yyyy, HH:MM")} -{" "}
                            <span className="text-blue-500">
                              {blade.sgKS ? blade.sgKS : blade.creator3}
                            </span>{" "}
                            har lagt til handling for{" "}
                            <span className="text-red-500">
                              {blade.bladType} {blade.side}
                            </span>
                            , kode:{" "}
                            <span className="text-orange-500">
                              {blade.handling}
                            </span>
                            .{" "}
                            {blade.anmKS && (
                              <>
                                Kommentar:{" "}
                                <span className="text-blue-500">
                                  {" "}
                                  ({blade.anmKS})
                                </span>
                              </>
                            )}{" "}
                            og id nr:{" "}
                            <span className="text-green-500">
                              {blade.bladeRelationId}
                            </span>
                          </li>
                        </>
                      )}
                    </div>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminContent;
