// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { api } from "~/utils/api";

interface IdProps {
  id: string;
}

export const RestoreComponent = ({ id }: IdProps) => {
  const ctx = api.useContext();
  const updateBlade = api.sawblades.update.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      void ctx.sawblades.getAllDeleted.invalidate();
      void ctx.sawblades.getCustomerAllDeleted.invalidate();
    },
  });
  return (
    <div
      onClick={() =>
        void updateBlade.mutate({
          id: id,
          deleted: false,
          deleteReason: "",
        })
      }
    >
      <button>GJENOPPRETT</button>
    </div>
  );
};
