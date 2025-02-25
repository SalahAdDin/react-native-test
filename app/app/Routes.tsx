import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogoutButton from "./components/LogoutButton";
import { useAuth } from "./contexts/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import PokeList from "./screens/PokeList";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { user, logout } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name="Home"
          component={PokeList}
          options={{
            title: "Home",
            headerRight: () => <LogoutButton />,
          }}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
