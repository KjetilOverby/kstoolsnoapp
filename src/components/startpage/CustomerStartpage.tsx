/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import HeaderComponent from "../reusable/HeaderComponent";
import CustomerContent from "./CustomerContent";

const CustomerStartpage = ({
  newblades,
  dateValue,
  setDateValue,
  deletedblades,
  servicepost,
}) => {
  return (
    <div data-theme="lightmode" className="min-h-screen bg-base-100">
      <HeaderComponent />
      <CustomerContent
        newblades={newblades}
        dateValue={dateValue}
        setDateValue={setDateValue}
        deletedblades={deletedblades}
        servicepost={servicepost}
      />
    </div>
  );
};

export default CustomerStartpage;
