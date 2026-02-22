import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchRandomDog } from "../services/api";
import PetCard from "../components/PetCard";
import CustomToast from "../components/CustomToast";
import usePetsStore from "../store/petsStore";
import useCartStore from "../store/cartStore";
import { colors } from "../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [randomImage, setRandomImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const pets = usePetsStore((state) => state.pets);
  const cartItems = useCartStore((state) => state.cartItems);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const FALLBACK_IMAGE =
    "https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg";

  const getRandomDog = async () => {
    try {
      setLoading(true);
      setFetchError(false);
      const response = await fetchRandomDog();
      const imageUrl = response?.data?.message;
      if (imageUrl) {
        setRandomImage(imageUrl);
      } else {
        setRandomImage(FALLBACK_IMAGE);
      }
    } catch (err) {
      setFetchError(true);
      setRandomImage(FALLBACK_IMAGE);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getRandomDog();
    setRefreshing(false);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  useEffect(() => {
    getRandomDog();
  }, []);

  const quotes = [
    "Every paw has a story 🐾",
    "A home is better with a pet ❤️",
    "Small paws, big love 🐶",
    "Your new best friend awaits 💛",
  ];

const randomQuote = useMemo(() => {
  return quotes[Math.floor(Math.random() * quotes.length)];
}, [randomImage]);


  const randomPet = {
    id: "random",
    petName: randomQuote,
    // breed: "",
    // age: "",
    // price: "",
    image: randomImage || FALLBACK_IMAGE,
  };

  const allPets = [randomPet, ...pets];

  return (
    <SafeAreaView style={styles.safeArea} >
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="paw"
                size={26}
                color={colors.primaryLight}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.title}>Paw-Mate</Text>
            </View>
            <Text style={styles.subtitle}>
              {pets.length} pet{pets.length !== 1 ? "s" : ""} available
            </Text>
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate("Cart")}
          >
            <Text style={styles.cartIcon}>🛒</Text>
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate("AddPet")}
          >
            <Text style={styles.primaryBtnText}>+ Add New Pet</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={allPets}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primaryDark]}
              tintColor={colors.primaryDark}
            />
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No pets yet</Text>
              <Text style={styles.emptyHint}>
                Add a pet or fetch a random dog image
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <PetCard
              pet={item}
              isRandom={item.id === "random"}
              isLoading={item.id === "random" && loading}
              showToast={showToast}
              navigation={navigation}
              onRefresh={getRandomDog}
              refreshDisabled={loading}
            />
          )}
        />

        <CustomToast
          message={toastMessage}
          visible={toastVisible}
          onHide={() => setToastVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,

    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.brown,
    fontFamily: "monospace"
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartIcon: {
    fontSize: 24,
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: colors.primaryDark,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 120,
  },
  secondaryBtnText: {
    color: colors.primaryDark,
    fontSize: 15,
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 24,
  },
  empty: {
    paddingVertical: 48,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  emptyHint: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
});
