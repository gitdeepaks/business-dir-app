import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Image
          s
          ource={require("../assets/images/icon.png")}
          style={{
            width: 300,
            height: 600,
            borderRadius: 20,
            borderWidth: 8,
            borderCoolor: "#000",
          }}
        />
      </View>

      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Your Ultimate
          <Text
            style={{
              color: Colors.PRIMARY,
            }}
          >
            Commutinity Dir App
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-med",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.GRAY,
          }}
        >
          Find your Business near you.
        </Text>
        <TouchableOpacity onPress={onPress} style={styles.btn}>
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontFamily: "outfit-med",
            }}
          >
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
    elevation: 1,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 99,
    marginTop: 20,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
