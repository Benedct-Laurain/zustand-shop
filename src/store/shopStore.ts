import { create } from 'zustand'

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

const useShopStore = create<ShopStore>((set) => ({
  isLoading: false,
  message: undefined,
  setIsLoading: (value: boolean) => set({ isLoading: value }),
  setMessage: (newMessage: Message) => set({ message: newMessage})
}))

export default useShopStore;
