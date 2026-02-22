import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCartStore from "../store/cartStore";
import { colors } from "../theme/colors";

export default function CartScreen({ navigation }) {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCartStore();

  const total = getTotalPrice();

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <View style={styles.container}>
        {cartItems.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyHint}>
              Add some furry friends from the pet list
            </Text>
            <TouchableOpacity
              style={styles.browseBtn}
              onPress={() => navigation.navigate("HomeScreen")}
            >
              <Text style={styles.browseBtnText}>Browse Pets</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.name}>{item.petName}</Text>
                    <Text style={styles.breed}>{item.breed}</Text>
                    <Text style={styles.price}>₹{item.price}</Text>

                    <View style={styles.quantityRow}>
                      <View style={styles.quantityControls}>
                        <TouchableOpacity
                          style={styles.qtyBtn}
                          onPress={() => decreaseQuantity(item.id)}
                        >
                          <Text style={styles.qtyBtnText}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <TouchableOpacity
                          style={styles.qtyBtn}
                          onPress={() => increaseQuantity(item.id)}
                        >
                          <Text style={styles.qtyBtnText}>+</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        style={styles.removeBtn}
                        onPress={() => removeFromCart(item.id)}
                      >
                        <Text style={styles.removeBtnText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />

            <View style={styles.footer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>₹{total.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.checkoutBtn}
                onPress={() => navigation.navigate("HomeScreen")}
              >
                <Text style={styles.checkoutBtnText}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    paddingTop: 16,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },
  browseBtn: {
    backgroundColor: colors.primaryDark,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  browseBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },
  breed: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryDark,
    marginTop: 4,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.primaryDark,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    minWidth: 24,
    textAlign: "center",
  },
  removeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  removeBtnText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    backgroundColor: colors.surface,
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primaryDark,
  },
  checkoutBtn: {
    backgroundColor: colors.primaryDark,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
