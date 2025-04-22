import { useCartContext } from "context/CartContext";

const useCart = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart } =
    useCartContext();

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
  };
};

export default useCart;
