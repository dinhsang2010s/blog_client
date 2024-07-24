"use client";
import { sessionToken } from "@/lib/http";
import { createContext, ReactNode, useLayoutEffect } from "react";

export default function AppProvider({
  children,
  initialSessionToken,
}: {
  children: ReactNode;
  initialSessionToken: string;
}) {
  useLayoutEffect(() => {
    sessionToken.value = initialSessionToken;
  }, [initialSessionToken]);

  return <>{children}</>;
}
