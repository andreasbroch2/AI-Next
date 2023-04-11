import Product from './product';
import PropTypes from 'prop-types';

const Products = ( {products} ) => {
	return (
		<div className="all-blog-posts-container grid grid-cols-1 md:grid-cols-3 gap-3 my-8">
			{
				products.map( ( post, index ) => {
					return (
						<div key={`${post?.node?.id}-${index}` ?? ''} className="post-box">
							<Product product={post?.node}/>
						</div>
					);
				} )
			}
		</div>
	);
};

Products.propTypes = {
	products: PropTypes.array
};

Products.defaultProps = {
	products: []
};

export default Products;
