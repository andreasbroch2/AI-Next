import Link from 'next/link'
// import nav menu
import NavigationMenu from './nav-menu'
// import image component
import Image from 'next/image'

export default function Header({ menuItems }) {
  // A function that triggers the menu to open when the hamburger icon is clicked
  function toggleMenu() {
    // Get the menu element
    const menu = document.querySelector('.menu-container')
    // toggle the hidden class
    menu.classList.toggle('hidden')
  }


  return (
    <>
      <header className="bg-white z-50 py-4 lg:flex lg:justify-between lg:items-center">
        <div className='flex justify-between items-center'>
          <Link href="/" className="hover:underline">
            <Image src="/favicon/AI Edge - Logo.png" alt="DK Smarthome - Logo" width={160} height={59} ></Image>
          </Link>
          <div className="lg:hidden">
              <i className="fa-solid fa-bars text-2xl" onClick={toggleMenu}></i>
          </div>
        </div>
        <NavigationMenu hidden={true} menuItems={menuItems} textColor={"secondary"} />
      </header>
    </>
  )
}