import { I18nProvider } from "@/application/providers/i18nProvider";
import { QueryClientProvider } from "@/application/providers/QueryClientProvider";
import { ThemeProvider } from "@/application/providers/ThemeProvider";
import { WebSocketProvider } from "@/application/providers/webSocketProvider";
import { UiProvider } from "@/shared/libs/contexts/UiContext";
import { Toaster } from "sonner";

export type AllProviderProps = {
  children: any;
};
export type ProviderProps = {
  children: any;
};

export const AllProviders = ({ children }: AllProviderProps) => {
  return (
    <I18nProvider>
      <QueryClientProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UiProvider>
            <WebSocketProvider>
              {children} <Toaster />
            </WebSocketProvider>
          </UiProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </I18nProvider>
  );
};
