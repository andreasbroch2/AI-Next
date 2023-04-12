import { Fragment } from 'react';
import CheckoutCartItem from "./CheckoutCartItem";

const YourOrder = ({ cart }) => {
	return (
		<Fragment>
			{cart ? (
				<Fragment>
					{/*Product Listing*/}
					<table className="checkout-cart table table-hover w-full mb-10">
						<thead>
							<tr className="woo-next-cart-head-container text-left">
								<th className="woo-next-cart-heading-el" scope="col" />
								<th className="woo-next-cart-heading-el" scope="col">Product</th>
								<th className="woo-next-cart-heading-el" scope="col">Total</th>
							</tr>
						</thead>
						<tbody>
							{cart.length ? (
								cart.map((item, index) => (
									<CheckoutCartItem key={index} item={item} />
								))
							) : null}
							{/*Total*/}
							<tr className="bg-gray-200">
								<td className="" />
								<td className="woo-next-checkout-total font-normal text-xl">Subtotal</td>
								<td className="woo-next-checkout-total font-normal text-xl">12 $</td>
							</tr>
						</tbody>
					</table>
				</Fragment>
			) : ''}
		</Fragment>
	)
};
export default YourOrder;
