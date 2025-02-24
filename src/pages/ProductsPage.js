import { useEffect } from "react";
import PageLayout from "../components/PageLayout.js";
import ProductCard from "../components/ProductCard.js";
import useProductStore from "../stores/ProductStore.ts";
import { PacmanLoader } from "react-spinners";
import useShopStore from "../stores/ShopStore.ts";
function ProductsPage({ setPage }) {
  // console.log(useProductStore())

  // Sans sélecteur
  const { products, getProducts } = useProductStore();
  const isLoading = useShopStore((state) => state.isLoading);

  // Avec sélecteur (optimisation)
  // const products = useProductStore((state) => state.products);
  // const getProducts = useProductStore((state) => state.getProducts);

  useEffect(function () {
    getProducts();
  }, []);

  const handleCartClick = (event) => {
    event.preventDefault();
    setPage("cart-page");
  };

  return (
    <PageLayout titleFr="Boutique" titleEn="Shop">
      {isLoading ? (
        <PacmanLoader />
      ) : (
        <div className="products-page-wrapper">
          <h2 className="form-title">Sélectionnez votre produit</h2>
          <div className="products-wrapper">
            <div className="row">
              {products &&
                products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
            </div>
          </div>
          <button className="btn product-page-button" onClick={handleCartClick}>
            Voir mon panier
          </button>
        </div>
      )}
    </PageLayout>
  );
}

export default ProductsPage;
