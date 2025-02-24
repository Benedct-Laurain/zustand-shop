import { create } from 'zustand'

interface ShopStore {
    isLoading: boolean,
    setIsLoading: (value: boolean) => void
}

const useShopStore = create<ShopStore>((set) => ({
  isLoading: false,
  setIsLoading: (value: boolean) => set({ isLoading: value })
}))

export default useShopStore;
