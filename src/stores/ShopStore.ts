import { create } from "zustand";


interface Message {
  messageText: string,
  type: "error" | "info"
}

interface ShopStore {
  isLoading: boolean,
  message?: Message,
  setIsLoading: (value: boolean) => void,
  setMessage: (message: Message) => void
}

// custom hook "use..."
const useShopStore = create<ShopStore>()((set) => ({
  isLoading: true,
  message: undefined,
  setIsLoading: (value: boolean) => set({ isLoading: value }),
  setMessage: (value: Message) => set({ message: value })
}));

export default useShopStore;
