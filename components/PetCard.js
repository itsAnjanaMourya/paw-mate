import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import useCartStore from "../store/cartStore";
import { colors } from "../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PetCard({ pet, isRandom, isLoading, showToast, navigation, onRefresh, refreshDisabled }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);

  const isInCart = cartItems.some((item) => item.id === pet.id);

  const handleAddToCart = () => {
    if (isRandom) return;
    addToCart(pet);
    showToast?.("Added to cart!");
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: pet.image }} style={styles.image} />
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
        {isRandom && !isLoading && (
          <View style={styles.randomBadge}>
            <Text style={styles.randomBadgeText}>Featured</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{pet.petName}</Text>
        {!isRandom && <Text style={styles.breed}>Breed: {pet.breed}</Text>}
        <View style={styles.meta}>

          {!isRandom && <>
            <Text style={styles.age}>Age: {pet.age}</Text>
            <Text style={styles.price}>₹{pet.price}</Text>
          </>
          }
        </View>

        {isRandom ? (
          <TouchableOpacity
            style={[styles.refreshBtn, refreshDisabled && styles.refreshBtnDisabled]}
            onPress={onRefresh}
            disabled={refreshDisabled}
          >
            <MaterialCommunityIcons name="dog" size={24} color="white" />
            <Text style={styles.refreshBtnText}>{" "}Meet Another One</Text>
          </TouchableOpacity>
        ) : isInCart ? (
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => navigation?.navigate("Cart")}
          >
            <Text style={styles.cartBtnText}>View in Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.cartBtn, styles.addBtn]}
            onPress={handleAddToCart}
          >
            <Text style={[styles.cartBtnText, styles.addBtnText]}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: 200,
    backgroundColor: colors.border,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  randomBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  randomBadgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    padding: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  breed: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  age: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primaryDark,
  },
  cartBtn: {
    backgroundColor: colors.background,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  addBtn: {
    backgroundColor: colors.primaryDark,
    borderColor: colors.primaryDark,
  },
  cartBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  addBtnText: {
    color: "#fff",
  },
  refreshBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryLight,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: -10
  },
  refreshBtnDisabled: {
    opacity: 0.6,
  },
  refreshBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
