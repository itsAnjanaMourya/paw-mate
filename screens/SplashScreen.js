import { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("HomeScreen");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <MaterialCommunityIcons
        name="paw"
        size={90}
        color={colors.primaryLight}
      />
      <Text style={styles.title}>Paw-Mate</Text>
      <Text style={styles.tagline}>
        Where every paw finds a home 🏡
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    marginTop: 16,
    color: colors.brown,
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
});