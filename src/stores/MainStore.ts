import { create } from "zustand";


type MainStore = {
  count: number
  inc: () => void
}

// custom hook "use..."
const useMainStore = create<MainStore>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))



export default useMainStore;




