export class ProductService {
  static getProductsFromApi = async () => {
    try {
      const fetchProducts = await fetch(
        "https://geoffreydelumeau.github.io/zustand-api/products/products.json",
      );

      const response = await fetchProducts.json();
      // const response = [];

      console.log("Products", response);
      return response;
    } catch (error) {
      console.log("error", error);
      return [];
    }
  };
}
