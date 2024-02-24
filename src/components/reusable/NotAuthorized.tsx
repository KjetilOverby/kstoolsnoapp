// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import Link from "next/link";

const NotAuthorized = () => {
  return (
    <div
      data-theme="darkmode"
      className="flex h-screen flex-col items-center justify-center"
    >
      <h1>Bruker ikke autorisert.</h1>
      <Link href="/">
        <button className="btn btn-sm bg-yellow-600 hover:bg-yellow-800">
          Til startsiden
        </button>
      </Link>
    </div>
  );
};

export default NotAuthorized;
