import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";

const profile = () => {
  const { signOut, isSignedIn } = useAuth();
  return (
    <View>
      {!isSignedIn && (
        <Link href="/(modals)/login">
          <Text>Log in</Text>
        </Link>
      )}
      {isSignedIn && <Button title="Log out" onPress={() => signOut()} />}
    </View>
  );
};

export default profile;
