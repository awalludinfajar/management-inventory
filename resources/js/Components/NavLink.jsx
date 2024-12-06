import React from 'react';
import { Link } from '@inertiajs/react';

const NavLink = ({ href, active, children }) => {
    const classes = active
        ? 'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-white focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
        : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-300 hover:text-white hover:border-gray-500 focus:outline-none focus:text-white focus:border-gray-500 transition duration-150 ease-in-out';

    return (
        <Link href={href} className={classes}>
            {children}
        </Link>
    );
};

export default NavLink;