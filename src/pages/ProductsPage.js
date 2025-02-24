import { useEffect } from "react";
import PageLayout from "../components/PageLayout.js";
import ProductCard from "../components/ProductCard.js";
import useProductStore from "../stores/ProductStore.ts";

function ProductsPage({ setPage }) {
  // console.log(useProductStore())

  // Sans sélecteur
  // const { products, getProducts, getProducts } = useProductStore();

  // Avec sélecteur (optimisation)
  // const products = useProductStore((state) => state.products);
  // const getProducts = useProductStore((state) => state.getProducts);

  // Avec sélecteur retournant un objet
  const { products, getProducts } = useProductStore((state) => ({
    products: state.products,
    getProducts: state.getProducts,
  }));

  useEffect(function () {
    getProducts();
    getProducts();
  }, []);

  const handleCartClick = (event) => {
    event.preventDefault();
    setPage("cart-page");
  };

  return (
    <PageLayout titleFr="Boutique" titleEn="Shop">
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
    </PageLayout>
  );
}

export default ProductsPage;
