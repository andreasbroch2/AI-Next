import Link from 'next/link';
import Image from 'next/image';

const Product = ({ product }) => {
	return (
		<div className="mb-8 relative">
			<Link href={`/products/${product?.slug}/`}>
			<figure className="overflow-hidden relative h-64">
				<Image className='blog-box-image relative' src={product?.featuredImage.node.sourceUrl} alt={product?.featuredImage.node.altText} fill title={product?.title ?? ''} sizes='100vw' />
			</figure>
			<div className='textbox'>
				
					<h2 className="font-bold mb-3 text-lg hover:text-blue-500" dangerouslySetInnerHTML={{ __html: product?.title ?? '' }} />
				
				<div dangerouslySetInnerHTML={{ __html: product?.excerpt ?? '' }} />
			</div>
			</Link>

		</div>
	);
};

export default Product;
