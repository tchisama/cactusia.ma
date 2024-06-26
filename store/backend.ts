// ordersStore.ts
import create, { SetState } from 'zustand';
import { Timestamp } from 'firebase/firestore'; // Assuming Timestamp is imported from Firebase

export interface CartItem {
  cactus: string;
  pot: string;
  quantity: number;
}

export type Order = {
  selected:  boolean;
  id: string;
  firstName: string;
  lastName: string;
  number: string;
  address: string;
  city: string;
  price: number;
  createdAt: Timestamp;
  cart: CartItem[];
  status:"New"|"Confirmé"|"Prêt"|"En livraison"|"Livré"|"Injoignable"|"Reporté"|"Annulé"|"Fake",
  note:string
};

interface OrdersStore {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

const useOrdersStore = create<OrdersStore>((set: SetState<OrdersStore>) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
}));

export default useOrdersStore;
