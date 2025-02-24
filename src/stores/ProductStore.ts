import { create } from "zustand";

interface Product {
  id: string,
  title: string,
  price: number,
  imager: string
}

interface ProductState {
  products: Product[]
}

interface ProductActions {
  setProducts: () => void
}

// custom hook "use..."
const useProductStore = create<ProductState & ProductActions>()((set) => ({
  products: [],
  setProducts: () => set(state => ({ products: [] })),
}));

export default useProductStore;
