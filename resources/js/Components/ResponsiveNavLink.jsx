import React from 'react';
import { Link } from '@inertiajs/react';

const ResponsiveNavLink = ({ href, active, children }) => {
    const classes = active
        ? 'block w-full ps-3 pe-4 py-2 border-l-4 border-indigo-400 text-start text-base font-medium text-white bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-700 focus:border-indigo-500 transition duration-150 ease-in-out'
        : 'block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 hover:border-gray-500 focus:outline-none focus:text-white focus:bg-gray-700 focus:border-gray-500 transition duration-150 ease-in-out';

    return (
        <Link href={href} className={classes}>
            {children}
        </Link>
    );
};

export default ResponsiveNavLink;