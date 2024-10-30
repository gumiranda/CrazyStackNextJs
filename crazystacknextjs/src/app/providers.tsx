import { ThemeProvider } from "@/application/providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export type AllProviderProps = {
  children: any;
};
export type ProviderProps = {
  children: any;
};
const queryClient = new QueryClient();

export const AllProviders = ({ children }: AllProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children} <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
