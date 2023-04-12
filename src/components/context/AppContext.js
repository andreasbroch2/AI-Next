import React, { useContext, useEffect, useState } from 'react';

const CartContext = React.createContext();

const initialState = [];//{items:

// Create a custom hook to access the cart context
export function useCart() {
	return useContext(CartContext);
}

export const AppProvider = (props) => {
	const [cartState, setCartState] = useState(initialState);
	useEffect(() => {
		const data = window.localStorage.getItem('cart_state');
		if ( data !== null ) setCartState(JSON.parse(data));
	  }, []);
	useEffect(() => {
		window.localStorage.setItem('cart_state', JSON.stringify(cartState));
	}, [cartState])
	return (
		<CartContext.Provider value={{ cartState, setCartState }}>
			{props.children}
		</CartContext.Provider>
	);
};
