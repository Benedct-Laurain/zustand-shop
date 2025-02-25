import { create, StateCreator } from "zustand";
import { ProductService } from "../services/ProductService";
import useShopStore from "./ShopStore";
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

interface Product
 {
  id: number,
  title: string,
  price: number,
  description: string,
  image: string,
  stock: {
    quantity: {
      value: number
    }
  }
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}


interface ProductState {
  products: Product[],
  cartItems: CartItem[]
}

interface ProductActions {
  getProducts: () => Promise<void>,
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQty: (type: "increment" | "decrement", id: number) => void;
  resetCart: () => void;
}

// custom hook "use..."
// const useProductStore = create<ProductState & ProductActions>()((set) => ({
//   isLoading: true,
//   products: [],
//   getProducts: async () => {
//     // set({ isLoading: true});
//     const productList = await ProductService.getProductsFromApi();



    // if(productList.length === 0){
    //   useShopStore.getState().setMessage({
    //     messageText: "Ya pas de produits, pas de dépenses for U today",
    //     type: "error"
    //   })
    // }

    // set({ products: productList });

    // set({ isLoading: false});

//     useShopStore.getState().setIsLoading(false)
//   },
// }));


const productStore: StateCreator<ProductState & ProductActions, [["zustand/devtools", never]]>  = (set, get) => ({
  products: [],
  cartItems: [],
  getProducts: async () => {
    // console.log("get", get())

    // Mettre isLoading à true
    useShopStore.getState().setIsLoading(true);

    // Effectuer un appel API pour aller chercher nos produits
    try {
      const productList = await ProductService.getProductsFromApi();
      // console.log("getProducts", productList);

      // Mettre loading à false
      // Mise à jour du store
      set({ products: productList },  false, "productStore/getProducts")

    } catch(error : any){
      console.log(error)
      useShopStore.getState().setMessage({
        messageText: error.message,
        type: "error"
      })
    } finally {
      useShopStore.getState().setIsLoading(false);
    } 

  },
  addToCart: (product: Product) => {
    const productExistInCart = get().cartItems.filter(
      (item) => item.id === product.id,
    );
    if (productExistInCart.length < 1) {
      set(
        (state) => ({
          cartItems: [
            ...get().cartItems,
            {
              ...product,
              quantity: 0,
            }
          ]
        }), false, "productStore/addToCart"
      );
    }
    get().updateQty("increment", product.id);
    console.log("Product Added successfully");
  },
  removeFromCart: (id: number) => {
    set(
      {
        cartItems: get().cartItems.filter((item) => item.id != id),
      }, false, "productStore/removeFromCart"
    );
    get().updateQty("decrement", id);
    console.log("Le produit a été retiré");
  },
  updateQty: (type: "increment" | "decrement", id: number) => {
    const item = get().cartItems.filter((item) => item.id === id);
    if (typeof item === "undefined" || item.length < 1) return;

    if (type === "decrement" && item[0].quantity === 1) {
      set(
        {
          cartItems: get().cartItems.filter((item) => item.id != id),
        }, false, "productStore/updateQty"
      );
    } else {
      const newQuantity: number =
        type === "increment" ? item[0].quantity + 1 : item[0].quantity - 1;
      const newItems = get().cartItems.map((item) =>
        item.id !== id ? item : { ...item, quantity: newQuantity },
      );
      set({ cartItems: newItems }, false, "productStore/updateQty");
      console.log("The quantity has been updated");
    }
    // Update quantity for products list
    const decrement = type === 'increment' ? -1 : 1;
    // const updatedProducts = get().products.map(product => {
    //   if(product.id === id) {
    //     return {
    //       ...product,
    //       stock: {
    //         ...product.stock,
    //         quantity: {
    //           ...product?.stock?.quantity,
    //           value:  (product.stock?.quantity?.value || 0)  + decrement
    //         }
    //       }
    //     }
    //   } else {
    //     return product;
    //   }
    // })
    // set({ products: updatedProducts }, false, "productStore/updateQty")

    set( produce(
      (draft: ProductState) => {
        const productToUpdate = draft.products.find(product => product.id === id);
        if(productToUpdate) {
          productToUpdate.stock.quantity.value = (productToUpdate?.stock?.quantity.value || 0) + decrement
        };
      }
    ))
    
  },
  resetCart: () => set({ cartItems: [] }, false, "productStore/resetCart"),
});

const useProductStore = create<ProductState & ProductActions>()(
  devtools(
    productStore
  )
  
)

export default useProductStore;
