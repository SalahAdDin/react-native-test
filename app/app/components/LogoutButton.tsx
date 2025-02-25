import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";
import { Alert } from "react-native";
import { Button } from "react-native-ui-lib";

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged out successfully");
    } catch (error) {
      console.error("Error logging out: ", error);
      Alert.alert("Error logging out");
    }
  };

  return (
    <Button
      label="Logout"
      onPress={handleLogout}
      outline
      size={Button.sizes.small}
      style={{ margin: 20 }}
      c
    />
  );
};

export default LogoutButton;
