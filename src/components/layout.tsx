import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import Seo from './seo'
import { AppProvider } from "./context/AppContext";

export default function Layout({ preview, children, footerMenuItems, data }) {
  const seo = data?.seo
	const uri = data?.uri
  return (
    <>
    <AppProvider>
      <Meta />
			<Seo seo={seo} uri={uri}/>
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer menuItems={footerMenuItems}/>
    </AppProvider>

    </>
  )
}
