import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { GetStaticPaths, GetStaticProps } from 'next'
import Container from '../../components/container'
import Layout from '../../components/layout'
import { getNavMenu, getAllProductsWithSlug, getSingleProduct } from '../../lib/api'
import Image from 'next/image'
import Price from "../../components/woocommerce/price";
import AddToCartButton from "../../components/woocommerce/addtocartbtn";
import Header from '../../components/header'

export default function Post({ product, preview, footerMenuItems, menuItems }) {
  const router = useRouter()
  if (!router.isFallback && !product?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout data={product}>
      { product ? (
      <Container>
				<div className="single-product container mx-auto my-8 px-4 xl:px-0">
					<div className="grid md:grid-cols-2 gap-4">
						<div className="product-images">
                                <Image
                                    src={ product?.image?.sourceUrl }
                                    alt={ product?.image?.altText }
                                    width="1000"
                                    height="1000"
                                />
						</div>
						<div className="product-info">
							<h4 className="products-main-title text-2xl uppercase">{ product?.title }</h4>
							<div

								dangerouslySetInnerHTML={ {
									__html: product?.content,
								} }
								className="product-description mb-5"
							/>
              
            <Price salesPrice={product?.salePrice} regularPrice={product?.regularPrice}/>
            <AddToCartButton product={ product }/>
						</div>
					</div>

				</div>
        </Container>
			) : (
				''
			) }
		</Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getSingleProduct(params?.slug)
  const menuItems = await getNavMenu('PRIMARY');
  const footerMenuItems = await getNavMenu('FOOTER');
  return {
    props: {
      product: data.product,
      menuItems,
      footerMenuItems,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllProductsWithSlug()
  return {
    paths: allPosts.edges.map(({ node }) => `/products/${node.slug}`) || [],
    fallback: true,
  }
}
