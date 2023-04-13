import { useCart } from "../context/AppContext";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";

export default function CartIcon() {
  const { cartState } = useCart();
  // Make sure the cart icon updates when cartState is updated
useEffect(() => {
    console.log("Cart state changed");
}, [cartState]);

  // Return the cart icon with the number of items in the cart if there are any
    return (
        <div className="flex items-center">
            <FaShoppingCart className="text-2xl" />
            {cartState?.products?.length > 0 && (
                <span className="text-sm text-white bg-indigo-500 rounded-full px-2 ml-2">
                    {cartState?.products.length}
                </span>
            )}
        </div>
    );
}