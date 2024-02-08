// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useEffect, useState, useRef } from "react";
import { AppDataContext } from "~/context";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [theme, setTheme] = useState("lightmode");
  const [themeUse, setThemeUse] = useState<string>("darkmode");

  const UseComponentDidMount = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = useRef<any>();
    useEffect(() => {
      ref.current = true;
    }, []);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ref.current;
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const isComponentMounted = UseComponentDidMount();

  // useEffect(() => {
  //   if (theme && isComponentMounted) {
  //     localStorage.setItem("darkMode", "true");
  //   } else if (!theme && isComponentMounted) {
  //     localStorage.setItem("darkMode", "false");
  //   }
  // }, [theme]);

  useEffect(() => {
    if (isComponentMounted) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    setThemeUse(localStorage.getItem("theme"));
  }, [theme]);

  return (
    <SessionProvider session={session}>
      <AppDataContext.Provider value={{ setTheme, theme }}>
        <Component {...pageProps} theme={themeUse} setTheme={setTheme} />
        <Analytics />
      </AppDataContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
