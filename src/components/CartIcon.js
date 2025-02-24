function CartIcon({ setPage }) {
  const items = [];

  const handleGoToCart = () => {
    setPage("cart-page");
  };

  const itemsNumber = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <button className="btn-cart" onClick={handleGoToCart}>
      Panier ({itemsNumber})
    </button>
  );
}

export default CartIcon;
