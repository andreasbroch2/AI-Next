import { useState } from 'react';
import { v4 } from "uuid";
import { getUpdatedItems } from "../../functions";
import { Cross, Loading } from "../../icons";
import Image from "next/image";

const CartItem = ({
	item,
	products,
	updateCartProcessing,
	id,
	handleRemoveProductClick,
}) => {
	return (
		<tr className="woo-next-cart-item" key={item.productId} id={id}>
			<th className="woo-next-cart-element woo-next-cart-el-close">
				{/* Remove item */}
				<span className="woo-next-cart-close-icon cursor-pointer"
					onClick={(event) => handleRemoveProductClick(event, id)}>
					<Cross />
				</span>
			</th>
			<td className="woo-next-cart-element">
				<Image width={100} height={100} src={item.image.sourceUrl} alt={item.image.altText} />
			</td>
			<td className="woo-next-cart-element">{item.title}</td>
			<td className="woo-next-cart-element">{item.salePrice} $</td>
			{/* Qty Input */}
			<td className="woo-next-cart-element woo-next-cart-qty text-center">
				{1}
			</td>
			<td className="woo-next-cart-element">
				{item.salePrice} $
			</td>
		</tr>
	)
};

export default CartItem;
