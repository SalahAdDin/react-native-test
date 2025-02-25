import { auth } from "@/firebaseConfig";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import LoaderScreen from "react-native-ui-lib/src/components/loaderScreen";
import { Colors } from "react-native-ui-lib/src/style";

interface AuthContextProps {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, [initializing]);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Optionally, show a loading indicator while checking auth status
  if (initializing) {
    return (
      <LoaderScreen message={"Loading pokemons..."} color={Colors.grey40} />
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
