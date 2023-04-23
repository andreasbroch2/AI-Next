import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import flatListToHierarchical from '../lib/flatListToHierarchical'
import Search from './Search'

export default function Header({ menuItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const targetRef = useRef(null);
  const hierarchicalMenuItems = flatListToHierarchical(menuItems?.edges);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !targetRef.current.contains(event.target)) {
        console.log('handleClickOutside', event.target)
          handleMenuToggle()
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  },[isOpen]);
  const handleMenuToggle = () => {
    console.log('handleMenuToggle')
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header className="mx-auto z-50 py-4 lg:flex lg:justify-around lg:items-center px-4 md:px-12">
        <div className='flex justify-between items-center'>
          <Link href="/" className="hover:underline">
            <Image src="/favicon/AI Edge - Logo.png" alt="DK Smarthome - Logo" width={160} height={64} priority></Image>
          </Link>
          <div className="lg:hidden" ref={targetRef}>
              <i className="fa-solid fa-bars text-2xl z-[60]" onClick={handleMenuToggle}></i>
          </div>
        </div>
        <nav role="navigation" ref={menuRef}>
            <div className={`${isOpen ? 'open' : ''} menu-container`} >
                <ul className={`menu mt-6 lg:mt-0 lg:flex lg:mx-4`}>
                    {hierarchicalMenuItems.map((item, index) => {
                        return (
                            // Insert classes from fetch
                            <li key={index} className={`${item.node.cssClasses} text-secondary mb-2 md:mb-0 text-lg lg:px-12`}>
                              {item.node.url == '#' && ( 
                                <><p className='text-black lg:text-secondary leading-[100px] mb-0'>{item.node.label}</p><hr></hr></>
                              )}
                              {item.node.url != '#' && ( 
                                <Link href={`${item.node.url}`}>{item.node.label ?? ''}</Link>
                              )}
                                {item.node.childItems && item.node.childItems.edges.length > 0 && (
                                    <ul className="sub-menu">
                                        {item.node.childItems.edges.map((childItem, index) => {
                                            if (childItem.node.cssClasses.includes('column-start')) {
                                                return (
                                                    <li key={index} className={`${childItem.node.cssClasses} text-black mb-2 md:mb-0 text-lg lg:px-6`}>
                                                        <p>{childItem.node.label}</p>
                                                        <hr></hr>
                                                        {childItem.node.childItems && childItem.node.childItems.edges.length > 0 && (
                                                            <ul className="sub-sub-menu">
                                                                {childItem.node.childItems.edges.map((subChildItem, index) => {
                                                                    return (
                                                                        <li key={index} className={`${subChildItem.node.cssClasses} text-secondary mb-2 md:mb-0 text-lg lg:px-6`}>
                                                                            <Link href={`${subChildItem.node.url}`}>{subChildItem.node.label ?? ''}</Link>
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        )}
                                                    </li>
                                                )
                                            }
                                            return (
                                                <li key={index} className={`${childItem.node.cssClasses} text-secondary mb-2 md:mb-0 text-lg lg:px-6`}>
                                                    <Link href={`${childItem.node.url}`}>{childItem.node.label ?? ''}</Link>
                                                    {childItem.node.childItems && childItem.node.childItems.edges.length > 0 && (
                                                        <ul className="sub-sub-menu">
                                                            {childItem.node.childItems.edges.map((subChildItem, index) => {
                                                                return (
                                                                    <li key={index} className={`${subChildItem.node.cssClasses} text-secondary mb-2 md:mb-0 text-lg lg:px-6`}>
                                                                        <Link href={`${subChildItem.node.url}`}>{subChildItem.node.label ?? ''}</Link>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
        <Search classes={"mobile"}/>
      </header>
    </>
  )
}