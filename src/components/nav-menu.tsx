import flatListToHierarchical from '../lib/flatListToHierarchical';
import Link from 'next/link';


export default function NavigationMenu({ menuItems, textColor, column = false, hidden } ) {
    if (!menuItems) {
        return null;
    }
    // If hidden then string should be 'hidden' else empty string	
    hidden = hidden ? 'hidden' : '';
    // Based on https://www.wpgraphql.com/docs/menus/#hierarchical-data
    const hierarchicalMenuItems = flatListToHierarchical(menuItems?.edges);

    function renderMenu(items) {
        return (
            <div className={`${hidden} mt-4 pb-4 md:p-4 lg:mt-0 lg:p-0 lg:bg-transparent lg:block menu-container`}>
                <ul className={`menu lg:flex lg:-mx-4`}>
                    {items.map((item, index) => {
                        return (
                            // Insert classes from fetch
                            <li key={index} className={`${item.node.cssClasses} text-${textColor} mb-2 md:mb-0 text-lg lg:mx-6`}>
                                <Link href={`${item.node.url}`}>{item.node.label ?? ''}</Link>
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


