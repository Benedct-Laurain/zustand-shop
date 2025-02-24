import { create } from "zustand";


interface ShopStore {
  isLoading: boolean,
  setIsLoading: (value: boolean) => void
}

// custom hook "use..."
const useShopStore = create<ShopStore>()((set) => ({
  isLoading: true,
  setIsLoading: (value: boolean) => set({ isLoading: value })
}));

export default useShopStore;
