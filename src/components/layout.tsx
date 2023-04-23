import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import Seo from './seo'
import { AppProvider } from "./context/AppContext";
import { ApolloProvider } from "@apollo/client";
import client from "./ApolloClient";
import Header from "./header";
import useSite from "../hooks/use-site";


export default function Layout({ children, data = null, type = "website" }) {
  const { menuItems, footerMenuItems } = useSite();

  const seo = data?.seo
  const uri = data?.uri

  return (
    <>
      <AppProvider>
        <ApolloProvider client={client}>
          <Meta />
          <Seo data={data} seo={seo} uri={uri} type={type}/>
          <div className="min-h-screen">
            <Alert />
            <Header menuItems={menuItems}/>
            <main>{children}</main>
          </div>
          <Footer menuItems={footerMenuItems} />
        </ApolloProvider>
      </AppProvider>
    </>
  )
}
