import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./Routes";

const queryClient = new QueryClient();

export default function HomeScreen() {
  useReactQueryDevTools(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </QueryClientProvider>
  );
}
