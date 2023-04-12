import {useState, useContext} from "react";
import {useQuery, useMutation} from '@apollo/client';
import Link from "next/link";
import cx from 'classnames';
import {useCart} from "../context/AppContext";
import {getFormattedCart} from "../../functions";
import GET_CART from "../../queries/get-cart";
import ADD_TO_CART from "../../mutations/add-to-cart";
import {v4} from 'uuid';

const AddToCart = (props) => {
    const {product} = props;

    const { setCartState } = useCart();

    const [showViewCart, setShowViewCart] = useState(false);
    const [addToCartLoading, setAddToCartLoading] = useState(false);

    const handleAddToCartClick= () => {
        setShowViewCart(true);
        setAddToCartLoading(true);
        setCartState(cartState => [...cartState, product]);
        setAddToCartLoading(false);
      }

    return (
        <div>
            {/*	Check if its an external product then put its external buy link */}
            {"ExternalProduct" === product.__typename ? (
                    <a href={product?.externalUrl ?? '/'} target="_blank"
                       className="px-3 py-1 rounded-sm mr-3 text-sm border-solid border border-current inline-block hover:bg-purple-600 hover:text-white hover:border-purple-600">
						Buy now
                    </a>
                ) :
                <button
					disabled={addToCartLoading}
                    onClick={handleAddToCartClick}
                    className={cx(
                        'px-3 py-1 rounded-sm mr-3 text-sm border-solid border border-current',
                        {'hover:bg-purple-600 hover:text-white hover:border-purple-600': !addToCartLoading},
                        {'opacity-50 cursor-not-allowed': addToCartLoading}
                    )}
                >
					{ addToCartLoading ? 'Adding to cart...' : 'Add to cart' }
                </button>
            }
            {showViewCart ? (
                <Link href="/cart">
                    <button
                        className="px-3 py-1 rounded-sm text-sm border-solid border border-current inline-block hover:bg-purple-600 hover:text-white hover:border-purple-600">View
                        Cart
                    </button>
                </Link>
            ) : ''}
        </div>
    );
};

export default AddToCart;
