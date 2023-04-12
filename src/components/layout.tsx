import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import Seo from './seo'
import { ApolloProvider } from "@apollo/client";
import { AppProvider } from "./context/AppContext";
import client from "./ApolloClient";

export default function Layout({ preview, children, footerMenuItems, data }) {
  const seo = data?.seo
	const uri = data?.uri
  return (
    <>
    <AppProvider>
      <ApolloProvider client={client}>
      <Meta />
			<Seo seo={seo} uri={uri}/>
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer menuItems={footerMenuItems}/>
      </ApolloProvider>
    </AppProvider>

    </>
  )
}
