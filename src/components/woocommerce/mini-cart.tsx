import { useCart } from "../context/AppContext";
import { FaShoppingCart } from "react-icons/fa";

export default function CartIcon() {
  const { cartState } = useCart();
  // Return the cart icon with the number of items in the cart if there are any
    return (
        <div className="flex items-center">
            <FaShoppingCart className="text-2xl" />
            {cartState?.length > 0 && (
                <span className="text-sm text-white bg-indigo-500 rounded-full px-2 ml-2">
                    {cartState?.length}
                </span>
            )}
        </div>
    );
}