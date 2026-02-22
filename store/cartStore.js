import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (pet) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === pet.id
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === pet.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cartItems: [...state.cartItems, { ...pet, quantity: 1 }],
      };
    }),

  increaseQuantity: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQuantity: (id) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === id
      );

      if (existingItem && existingItem.quantity > 1) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }

      return {
        cartItems: state.cartItems.filter(
          (item) => item.id !== id
        ),
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  getTotalPrice: () => {
    return get().cartItems.reduce(
      (total, item) =>
        total + Number(item.price) * item.quantity,
      0
    );
  },
}));

export default useCartStore;