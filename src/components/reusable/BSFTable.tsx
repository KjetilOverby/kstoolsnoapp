import React from "react";

const BSFTable = () => {
  return (
    <div>
      <table className="table table-xs ml-5 w-full border border-primary bg-base-100 text-neutral shadow-xl">
        <thead>
          <tr className="border border-primary">
            <th className="text-lg italic text-neutral">Kode</th>
            <th className="text-lg italic text-neutral">Beskrivelse</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border border-primary">
            <th>BFS423</th>
            <th>EKSTRA RETTING BÅND</th>
          </tr>
          <tr className="border border-primary">
            <th>BFS426</th>
            <th>BUNNSTUK BÅND</th>
          </tr>
          <tr className="border border-primary">
            <th>BFS427</th>
            <th>RETTING-STREKKING-SLIPING METER</th>
          </tr>
          <tr className="border border-primary">
            <th>BFS429</th>
            <th>STELL.FERDIG SLIP OG RETT f.o.m 100mm bredde TANN</th>
          </tr>
          <tr className="border border-primary">
            <th>BFS438</th>
            <th>REP.SVEIST STELLIT TANN</th>
          </tr>
          <tr>
            <th>BFS442</th>
            <th>SLIPESERVICE AV REP.TENNER METER</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BSFTable;
