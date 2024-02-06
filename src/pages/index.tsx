// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { signIn, signOut, useSession } from "next-auth/react";

import AdminStartpage from "~/components/startpage/AdminStartpage";
import FrontpageSessionless from "~/components/startpage/FrontpageSessionless";
import CustomerStartpage from "../components/startpage/CustomerStartpage";
import NotLoggedInPage from "~/components/startpage/NotLoggedInPage";

interface adminProps {
  theme: string;
}

export default function Home({ theme }: adminProps) {
  const { data: sessionData } = useSession();

  return (
    <div>
      {!sessionData && <NotLoggedInPage />}
      {sessionData && sessionData.user.role === "LOGIN" && (
        <FrontpageSessionless session={sessionData} />
      )}
      {sessionData && sessionData.user.role === "ADMIN" && (
        <AdminStartpage theme={theme} />
      )}
      {sessionData && sessionData.user.role === "MO_ADMIN" && (
        <CustomerStartpage />
      )}
    </div>
  );
}

//test
