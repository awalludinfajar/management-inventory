import React from 'react';
import { usePage, router } from '@inertiajs/react';

const Pagination = ({ path }) => {
    const { data } = usePage().props;  // Get pagination data from the page
    const pagination = data; // Access the pagination links directly

    // Modify pagination labels directly to handle "Previous" and "Next"
    pagination.links[0].label = pagination.links[0].label === "&laquo; Previous" ? "Previous" : pagination.links[0].label;
    pagination.links[pagination.links.length - 1].label = pagination.links[pagination.links.length - 1].label === "Next &raquo;" ? "Next" : pagination.links[pagination.links.length - 1].label;

    // Handle page navigation
    const goToPage = (url) => {
        if (!url) return;
        const pageNumber = new URL(url, window.location.origin).searchParams.get('page');
        if (pageNumber) {
            router.get(route(path, { page: pageNumber }));
        }
    };

    return (
        <div className="m-4 flex justify-left space-x-2">
            {pagination.links.map((page) => (
                <button
                    key={page.label}
                    className={`px-4 py-2 rounded-md ${page.active ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
                    onClick={() => goToPage(page.url)}
                >
                    {page.label}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
