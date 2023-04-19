import flatListToHierarchical from '../lib/flatListToHierarchical';
import Link from 'next/link';
import { useEffect, useRef } from 'react';


export default function NavigationMenu({ menuItems, textColor, column = false, hidden  }) {
    if (!menuItems) {
        return null;
    }
    // If hidden then string should be 'hidden' else empty string	
    hidden = hidden ? 'hidden' : '';
    // Based on https://www.wpgraphql.com/docs/menus/#hierarchical-data
    const hierarchicalMenuItems = flatListToHierarchical(menuItems?.edges);

    function renderMenu(items) {
        return (
            <div className={`${hidden} bg-lightprimary z-50 mt-4 pb-4 md:p-4 lg:mt-0 lg:p-0 lg:bg-transparent lg:block menu-container`}>
                <ul className={`menu lg:flex lg:-mx-4`}>
                    {items.map((item, index) => {
                        return (
                            // Insert classes from fetch
                            <li key={index} className={`${item.node.cssClasses} text-${textColor} mb-2 md:mb-0 text-lg lg:px-12`}>
                                <Link href={`${item.node.url}`}>{item.node.label ?? ''}</Link>
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
                                                                        <li key={index} className={`${subChildItem.node.cssClasses} text-${textColor} mb-2 md:mb-0 text-lg lg:px-6`}>
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
                                                <li key={index} className={`${childItem.node.cssClasses} text-${textColor} mb-2 md:mb-0 text-lg lg:px-6`}>
                                                    <Link href={`${childItem.node.url}`}>{childItem.node.label ?? ''}</Link>
                                                    {childItem.node.childItems && childItem.node.childItems.edges.length > 0 && (
                                                        <ul className="sub-sub-menu">
                                                            {childItem.node.childItems.edges.map((subChildItem, index) => {
                                                                return (
                                                                    <li key={index} className={`${subChildItem.node.cssClasses} text-${textColor} mb-2 md:mb-0 text-lg lg:px-6`}>
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
        );
    }

    return (
        <nav
            role="navigation">
            {renderMenu(hierarchicalMenuItems)}
        </nav>
    );
}


