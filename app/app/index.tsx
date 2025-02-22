import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PokeList from "./screens/PokeList";

const queryClient = new QueryClient();

export default function HomeScreen() {
  useReactQueryDevTools(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <PokeList />
    </QueryClientProvider>
  );
}
