import React, { useEffect, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import { Head, Link, router } from "@inertiajs/react";
import TextInput from "../../Components/TextInput";
import PrimaryButton from "../../Components/PrimaryButton";
import Table from "./Table";
import SelectOption from "../../Components/SelectOption";

const InventoryPage = ({data, kategori_barang}) => {
    const inventory = data || [];
    
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        router.get(route('page.inventory'), { 
            refSelected: selectedCategory, 
            search: search 
        }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }, [selectedCategory, search]);

    const filterData = inventory.filter((data) => 
        data.nama_barang.toLowerCase().includes(search.toLowerCase())
    );
    
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    };

    const pageInput = route('page.form', 0);
    return (
        <>
            <Head title="Inventory page" />

            <MainLayout header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">List of Inventaris</h2>
            } >
                <div className="py-12">
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                            <section>
                                <div className="flex flex-col md:flex-row items-center mb-4 md:justify-between gap-4">
                                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                                        <TextInput
                                            value=""
                                            onChange={(newValue) => setSearch(newValue)}
                                            placeholder="Cari Nama barang..."
                                        />
                                        <SelectOption
                                            className="block h-10"
                                            data={kategori_barang}
                                            value={selectedCategory}
                                            onModelValueChange={handleCategoryChange}
                                        />
                                    </div>
                                    <Link href={pageInput}>
                                        <PrimaryButton>Create new</PrimaryButton>
                                    </Link>
                                </div>
                                <Table data={filterData} />
                            </section>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default InventoryPage;