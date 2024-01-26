// cartStore.ts
import create, { SetState } from 'zustand';

export interface CartItem {
  cactus: string;
  pot: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
}

const useCartStore = create<CartStore>((set: SetState<CartStore>) => ({
  cart: [],
  updateQuantity: (index, quantity) => set((state) => {
    if(quantity <= 0) return { cart: state.cart.filter((_, i) => i !== index)}
    const updatedCart = [...state.cart];
    updatedCart[index].quantity = quantity;
    return { cart: updatedCart };
  }),
  addToCart: (item) => set((state) => {
    const existingItemIndex = state.cart.findIndex(
      (cartItem) => cartItem.cactus === item.cactus && cartItem.pot === item.pot
    );

    if (existingItemIndex !== -1) {
      // Item already exists, update quantity
      const updatedCart = [...state.cart];
      updatedCart[existingItemIndex].quantity += item.quantity;
      return { cart: updatedCart };
    } else {
      // Item does not exist, add to cart
      return { cart: [...state.cart, item] };
    }
  }),
  removeFromCart: (index) => set((state) => ({ cart: state.cart.filter((_, i) => i !== index) })),
}));

export default useCartStore;
