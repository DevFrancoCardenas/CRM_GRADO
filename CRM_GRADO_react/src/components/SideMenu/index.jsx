import React, { useState } from 'react';
import { Bars3Icon, HomeIcon } from '@heroicons/react/20/solid';
import "./SideMenu.css";
import { Link } from 'react-router-dom';
import Icon from '../Icon';

// Función classNames de Tailwind
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

// Componente para cada ítem del menú
const MenuItem = ({ item, isExpanded, store }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isChildActive = (children) => {
        return children.some(child => verifyRuta(child));
    };
    function verifyRuta(child) {
        if (child.href[0] != "/") {
            return location.pathname.split('/').slice(0, -1).join('/').includes("/dashboard/" + child.href.split('/').slice(0, -1).join('/'));
        } else {
            return location.pathname == child.href;
        }
    }
    return (
        <div className='ml-3  mb-4 '>
            {!item?.children ?
                <>
                    {/* SIN HIJOS */}
                    {store.checkPermissions(item?.permissions) &&
                        <Link className={`flex items-center cursor-alias ${(verifyRuta(item) && !isOpen) ? 'rounded-l-full bg-gray-200 bg-opacity-30' : ''}`} to={item?.href}>
                            <div
                                className="p-2"
                            >
                                <Icon name={item?.icon} className="h-6 w-6 border-r-2 rounded-full" />
                            </div>
                            <div className="flex-1 min-w-0">
                                {isExpanded &&
                                    <span className="block overflow-hidden whitespace-nowrap flex-1 ml-0.5 min-w-0 pl-2 -my-1 rounded-md degraded-background hover:bg-gray-200 hover:bg-opacity-30 transition-all duration-300">
                                        {item?.name}
                                    </span>
                                }
                            </div>
                        </Link>
                    }
                </>
                :
                <>
                    {/* CON HIJOS */}
                    {store.checkPermissionsMenu(item?.permissions) &&
                        <div>
                            <div className={`flex items-center cursor-pointer transform transition duration-150 ease-in-out active:scale-95 ${(isChildActive(item.children) && !isOpen) ? 'rounded-l-full bg-gray-200 bg-opacity-30' : ''}`}>
                                <a
                                    className="p-2"
                                    onClick={() => item?.children && setIsOpen(!isOpen)}
                                >
                                    <Icon name={item?.icon} className="h-6 w-6" />
                                </a>
                                <div className="flex-1 min-w-0" onClick={() => item?.children && setIsOpen(!isOpen)}>
                                    {isExpanded &&
                                        <>
                                            {isOpen ?
                                                <span className="flex items-center justify-between overflow-hidden whitespace-nowrap">
                                                    {item?.name}
                                                    <Icon name="ChevronDownIcon" className="h-5 mr-5" />
                                                </span> :
                                                <span className="flex items-center justify-between overflow-hidden whitespace-nowrap">
                                                    {item?.name}
                                                    <Icon name="ChevronRightIcon" className="h-5 mr-1" />
                                                </span>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                            <div
                                className={classNames(
                                    'submenu',
                                    isOpen ? 'max-h-40' : 'max-h-0'
                                )}
                                style={{ transition: "max-height 0.3s ease-in-out" }}
                            >
                                {item?.children && item?.children.map((child) => (
                                    <React.Fragment key={child.href}>
                                        {
                                            store.checkPermissions(child?.permissions) &&
                                            <>
                                                <Link className={"flex items-center p-2 cursor-alias " + (verifyRuta(child) ? 'rounded-l-full bg-gray-200 bg-opacity-30' : '')} to={child.href}>
                                                    <Icon name={child.icon} className="h-5 w-5 mr-2 text-white border-r-2 rounded-full" />
                                                    <div className="flex-1 min-w-0">
                                                        {isExpanded &&
                                                            <span className="block overflow-hidden whitespace-nowrap flex-1 ml-0.5 min-w-0 pl-2 -my-1 rounded-md degraded-background hover:bg-gray-200 hover:bg-opacity-30  transition-all duration-300">
                                                                {child?.name}
                                                            </span>
                                                        }
                                                    </div>
                                                </Link>
                                            </>
                                        }
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    }
                </>
            }
            <div className="border-top-right-sub" />
        </div>
    );
};



const SideMenu = ({ store, navigation, adminNavigation }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [initFixed, setInitFixed] = useState(false);

    const handleMouseEnter = () => {
        if (!isFixed && !initFixed) {
            setIsExpanded(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isFixed && !initFixed) {
            setIsExpanded(false);
        }
    };

    const toggleFixedMenu = () => {
        if (!isFixed) {
            setIsExpanded(false);
            setInitFixed(true);
            setTimeout(() => {
                setIsFixed(!isFixed);
                setIsExpanded(!isFixed);
            }, 500);
            setTimeout(() => {
                setInitFixed(false);
            }, 1000);
        } else {
            setInitFixed(true);
            setIsFixed(!isFixed);
            setIsExpanded(!isFixed);
            setTimeout(() => {
                setInitFixed(false);
            }, 1000);
        }
    };

    const menuClass = isFixed ? "w-65" : "w-14";

    return (
        <div className={"no-print " + menuClass + " transition-width duration-300 ease-in-out"}>
            <div
                className={classNames(
                    'side-menu border-r border-white shadow-2xl bg-gradient-to-b from-blue-700 to-blue-600 ',
                    isExpanded && 'expanded',
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-center h-12 border-b-2 cursor-pointer ">
                    <Bars3Icon data-testid="bars-icon" onClick={toggleFixedMenu} className="h-8 w-8 ml-4" />
                    
                </div>
                <div className='my-2 '>
                    {navigation.map(item =>
                        <MenuItem key={item.name} item={item} isExpanded={isExpanded} store={store} />
                    )}
                </div>
                <div className="pt-2 border-top-right " />
                {(store?.user?.is_admin || true) &&
                    <div>
                        {adminNavigation.map(item =>
                            <MenuItem key={item.name} item={item} isExpanded={isExpanded} store={store} />
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default SideMenu;