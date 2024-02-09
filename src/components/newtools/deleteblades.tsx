// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { api } from "~/utils/api";

interface bladeProps {
  blade: string;
}

const Deleteblades = ({ blade }: bladeProps) => {
  const ctx = api.useContext();

  const deleteBladeApi = api.sawblades.delete.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAllcreate.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
    },
  });

  const deleteBlade = () => {
    try {
      deleteBladeApi.mutate({ id: blade });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <button onClick={deleteBlade}>SLETT</button>
      </div>
      <div></div>
    </>
  );
};

export default Deleteblades;
