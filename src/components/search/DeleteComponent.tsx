// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { api } from "~/utils/api";

interface AnyProps {
  id: string;
  deleteReason: string;
  wasteReasonInput: string;
  setWasteReasonInput: React.Dispatch<React.SetStateAction<string>>;
}

export const DeleteComponent = ({
  id,
  wasteReasonInput,
  setWasteReasonInput,
}: AnyProps) => {
  const ctx = api.useContext();
  const updateBlade = api.sawblades.update.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      void ctx.sawblades.getAllDeleted.invalidate();
      void ctx.sawblades.getCustomerAllDeleted.invalidate();
      void ctx.sawblades.countAllBlades.invalidate();
      setWasteReasonInput("");
    },
  });
  return (
    <div
      onClick={() =>
        void updateBlade.mutate({
          id: id,
          deleted: true,
          deleteReason: wasteReasonInput,
        })
      }
    >
      <button>SLETT</button>
    </div>
  );
};
