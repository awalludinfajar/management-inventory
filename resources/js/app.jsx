import React from "react";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "../css/app.css"

const appName = import.meta.env.VITE_APP_NAME || "Inventory Management";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', {eager: true});
        return pages[`./Pages/${name}.jsx`];
    },
    setup({el, App, props }) {
        createRoot(el).render(<App {...props} />);   
    },
    progress: {
        color: '#4B5563',
    }
});