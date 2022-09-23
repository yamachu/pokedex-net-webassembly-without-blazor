import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export const ReactQueryClientProviderWrapper: (
  queryClient: QueryClient
) => React.FC<PropsWithChildren> =
  (queryClient) =>
  ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
