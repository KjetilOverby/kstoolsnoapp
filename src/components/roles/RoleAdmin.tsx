import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

interface RoleAdminProps {
  children: React.ReactNode;
}

const RoleAdmin = ({ children }: RoleAdminProps) => {
  const { data: sessionData } = useSession();
  return <div>{sessionData?.user.role === "ADMIN" && children}</div>;
};

export default RoleAdmin;
