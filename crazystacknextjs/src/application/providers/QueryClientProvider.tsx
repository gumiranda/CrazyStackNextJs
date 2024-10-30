"use client";

import * as React from "react";

import {
  QueryClient,
  QueryClientProvider as TanStackProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export function QueryClientProvider({ children }: any) {
  return <TanStackProvider client={queryClient}>{children}</TanStackProvider>;
}
