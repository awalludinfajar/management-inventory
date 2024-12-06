import React, { useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import BackButton from "../../Components/BackButton";
import InputLabel from "../../Components/InputLabel";
import InputError from "../../Components/InputError";
import TextInput from "../../Components/TextInput";
import SelectOption from "../../Components/SelectOption";
import NumberInput from "../../Components/NumberInput";
import PriceInput from "../../Components/PriceInput";
import DateInput from "../../Components/DateInput";
import PrimaryButton from "../../Components/PrimaryButton";
import axios from "axios";
import Swal from "sweetalert2";

const Form = ({ kategori_barang, result }) => {
    const res = result || {};

    const sliceDate = (date) => {
        if (!date) {
            return "";
        }
        const newDate = date.split(" ");
        return newDate[0];
    }

    const [formData, setFormData] = useState({
        nama_barang: res.nama_barang || "",
        kategori_barang: res.kategori_barang || "",
        jumlah_barang: res.jumlah_barang || "",
        harga_per_unit: res.harga_per_unit || "",
        tanggal_masuk: sliceDate(res.tanggal_masuk) || "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to save this form?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Save it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(route("data.input", res.id || 0), formData);
                    Swal.fire({
                        title: "Saved!",
                        text: response.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(() => {
                        window.location.href = route("page.inventory");
                    });
                } catch (error) {
                    if (error.response && error.response.data.errors) {
                        setErrors(error.response.data.errors);
                        Swal.fire({
                            title: "Error",
                            text: "There was an error saving the form. Please check the errors.",
                            icon: "error",
                        });
                    }
                }
            }
        });
    };

    return (
        <>
            <Head title="Inventory Form" />

            <MainLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Form Input Inventaris
                    </h2>
                }
            >
                <div className="py-12">
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                        <BackButton />
                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                            <section>
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Inventory Input
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Store inventory data into the database.
                                    </p>
                                </header>

                                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <InputLabel htmlFor="nama_barang" value="Nama Barang" />
                                        <TextInput
                                            id="nama_barang"
                                            value={formData.nama_barang}
                                            onChange={(value) => handleChange("nama_barang", value)}
                                            className="mt-1 block w-full"
                                            placeholder="Input Nama..."
                                        />
                                        <InputError className="mt-2" message={errors.nama_barang} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="kategori_barang" value="Kategori Barang" />
                                        <SelectOption
                                            className="mt-1 block w-full h-10"
                                            modelValue={formData.kategori_barang}
                                            data={kategori_barang}
                                            onModelValueChange={(value) =>
                                                handleChange("kategori_barang", value)
                                            }
                                        />
                                        <InputError className="mt-2" message={errors.kategori_barang} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="jumlah_barang" value="Jumlah Barang" />
                                        <NumberInput
                                            id="jumlah_barang"
                                            value={formData.jumlah_barang}
                                            onChange={(value) => handleChange("jumlah_barang", value)}
                                            className="mt-1 block w-full"
                                            placeholder="Qty..."
                                        />
                                        <InputError className="mt-2" message={errors.jumlah_barang} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="harga_per_unit" value="Harga per Unit" />
                                        <PriceInput
                                            id="harga_per_unit"
                                            value={formData.harga_per_unit}
                                            onChange={(value) => handleChange("harga_per_unit", value)}
                                            className="mt-1 block w-full"
                                            placeholder="Input Harga..."
                                        />
                                        <InputError className="mt-2" message={errors.harga_per_unit} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="tanggal_masuk" value="Tanggal Masuk" />
                                        <DateInput
                                            id="tanggal_masuk"
                                            value={formData.tanggal_masuk}
                                            onChange={(value) => handleChange("tanggal_masuk", value)}
                                            className="w-full"
                                        />
                                        <InputError className="mt-2" message={errors.tanggal_masuk} />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <PrimaryButton disabled={false}>Save</PrimaryButton>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default Form;
