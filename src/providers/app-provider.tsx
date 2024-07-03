"use client";
import { info_api } from "@/api/auth";
import { createContext, useEffect, useState } from "react";

const AppContext = createContext({
  isAuth: false,
});

export default function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    get_info();
  }, []);

  const get_info = async () => {
    try {
      var info = await info_api();
      console.log("info", info);

      if (info?.id) setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      location.pathname = "/login";
    }
  };

  return (
    <AppContext.Provider value={{ isAuth }}>{children}</AppContext.Provider>
  );
}
