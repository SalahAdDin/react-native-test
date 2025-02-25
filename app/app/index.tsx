import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Colors, LoaderScreen } from "react-native-ui-lib";
import LoginScreen from "./screens/LoginScreen";
import PokeList from "./screens/PokeList";

const queryClient = new QueryClient();

export default function HomeScreen() {
  useReactQueryDevTools(queryClient);

  const [user, setUser] = useState<unknown | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, [initializing]);

  if (initializing)
    return (
      <LoaderScreen message={"Loading pokemons..."} color={Colors.grey40} />
    );

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PokeList />
    </QueryClientProvider>
  );
}
