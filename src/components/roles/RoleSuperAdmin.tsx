// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
interface RoleAdminProps {
  children: React.ReactNode;
}

const RoleSuperAdmin = ({ children }: RoleAdminProps) => {
  const { data: sessionData } = useSession();
  return (
    <div>
      {sessionData?.user.role === "ADMIN" &&
        sessionData?.user.email === "ktldesign80@gmail.com" &&
        children}
    </div>
  );
};

export default RoleSuperAdmin;
