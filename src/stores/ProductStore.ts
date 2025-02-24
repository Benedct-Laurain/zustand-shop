import { create } from "zustand";
import { ProductService } from "../services/ProductService";
import useShopStore from "./ShopStore";

interface Product
 {
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
  isLoading: boolean,
  products: Product[]
}

interface ProductActions {
  getProducts: () => void
}

// custom hook "use..."
const useProductStore = create<ProductState & ProductActions>()((set) => ({
  isLoading: true,
  products: [],
  getProducts: async () => {
    // set({ isLoading: true});
    const productList = await ProductService.getProductsFromApi();



    if(productList.length === 0){
      useShopStore.getState().setMessage({
        messageText: "Ya pas de produits, pas de dépenses for U today",
        type: "error"
      })
    }

    set({ products: productList });

    // set({ isLoading: false});

    useShopStore.getState().setIsLoading(false)
  },
}));

export default useProductStore;
