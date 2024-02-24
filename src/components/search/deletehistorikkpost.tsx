// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { api } from "~/utils/api";
import { RiDeleteBinFill } from "react-icons/ri";

interface PostProps {
  post: string;
  setOpenBandhistorikkData: React.Dispatch<React.SetStateAction<boolean>>;
}

const Deletehistorikkpost = ({ post, setOpenBandhistorikkData }: PostProps) => {
  const ctx = api.useContext();

  const deleteBladeApi = api.bandhistorikk.delete.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      void ctx.sawblades.getAllIngenHandling.invalidate();
    },
  });

  const deletePost = () => {
    deleteBladeApi.mutate({ id: post });
    setOpenBandhistorikkData(false);
  };
  return (
    <>
      <div>
        <button onClick={deletePost}>
          <RiDeleteBinFill
            style={{ fontSize: "1rem" }}
            className="text-primary"
          />
        </button>
      </div>
      <div></div>
    </>
  );
};

export default Deletehistorikkpost;
