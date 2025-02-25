import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Colors, Text, TextField, View } from "react-native-ui-lib";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      setError(error.message)
    );
  };

  return (
    <View gap-20 padding-20 center>
      <Text text40BO center marginB-20>
        Login
      </Text>
      <TextField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button label="Login" onPress={handleLogin} style={styles.button} />

      {error && (
        <Text color={Colors.red30} marginB-10>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: { marginBottom: 15 },
  button: { marginTop: 10 },
});

export default LoginScreen;
