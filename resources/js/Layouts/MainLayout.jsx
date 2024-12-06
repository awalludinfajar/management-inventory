import { useState } from "react";
import NavLink from "../Components/NavLink";
import ResponsiveNavLink from "../Components/ResponsiveNavLink";

const MainLayout = ({children, header}) => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const inventoryUrl = route('page.inventory');
    const inventoryUrlActive = route().current('page.inventory');
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex-1">
                <nav className="border-b border-zinc-100 bg-zinc-700">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={inventoryUrl}
                                        active={inventoryUrlActive}
                                    >
                                        Inventaris
                                    </NavLink>
                                </div>
                            </div>
                            <div className="-me-2 flex items-center sm:hidden">
                                <button onClick={() =>
                                        setShowingNavigationDropdown(!showingNavigationDropdown)
                                    }
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none" >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path className={
                                                showingNavigationDropdown ? 'hidden' : 'inline-flex'
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path className={
                                                showingNavigationDropdown ? 'inline-flex' : 'hidden'
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`sm:hidden ${ showingNavigationDropdown ? 'block' : 'hidden' }`} >
                        <div className="space-y-1 pb-3 pt-2 ml-4">
                            <ResponsiveNavLink
                                href={inventoryUrl}
                                active={inventoryUrlActive}
                            >
                                Inventaris
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </nav>
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
                <main>{children}</main>
            </div>

            <footer className="bg-zinc-700 text-white py-6 mt-auto">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mt-6 text-center text-gray-400">
                        &copy; 2024 Inventaris System. Test Interview.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;