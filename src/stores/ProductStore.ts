import { create } from "zustand";
import  Products  from "../api/products/products.json"; 



interface Product {
  id: number,
  title: string,
  price: number,
  description: string,
  image: string,
  stock: {
    ref: string,
    quantity: {
      country: string, 
      value: number
    }
  }
}

interface ProductState {
  products: Product[]
}

interface ProductActions {
  getProducts: () => void
}

// custom hook "use..."
const useProductStore = create<ProductState & ProductActions>()((set) => ({
  products: [],
  getProducts: () => set({ products: Products }),
}));

export default useProductStore;
