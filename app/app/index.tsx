import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { StyleSheet } from "react-native";

// import "./firebase";
import PokeList from "./screens/PokeList";

const queryClient = new QueryClient();

export default function HomeScreen() {
  useReactQueryDevTools(queryClient);

  /* 
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing)
    return (
      <LoaderScreen message={"Loading pokemons..."} color={Colors.grey40} />
    );

  if (!user) {
    return <LoginScreen />;
  }
 */
  return (
    <QueryClientProvider client={queryClient}>
      <PokeList />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});
