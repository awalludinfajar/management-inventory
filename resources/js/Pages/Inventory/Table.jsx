import React from "react";
import EditButton from "../../Components/EditButton";
import RemoveButton from "../../Components/RemoveButton";
import Swal from "sweetalert2";
import axios from "axios";

const Table = ({data = []}) => {

    const setIdr = (crcy) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(crcy);
    };

    const sliceDate = (date) => {
        const newDate = date.split(" ");
        const [year, month, day] = newDate[0].split("-");
        
        return `${day}-${month}-${year}`;
    }

    const handleEdit = (val) => {
        window.location.href = route('page.form', val);
    }

    const handleDelete = (val) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to Delete this data?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                axios.delete(route('data.remove', val))
                .then(response => {
                    Swal.fire({
                        title: "Deleted!",
                        text: response.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(() => {
                        window.location.reload();
                    });
                }).catch(error => {
                    console.log(error);
                });
            }
        });
    }

    const tHead = ["No.", "Nama Barang", "Kategori", "Jumlah Barang", "Harga Total", "Tanggal Masuk", "Aksi"];
    return (
        <>
            <div className="overflow-x-auto">
                <table id="product-table" className="min-w-full table-auto border-collapse border border-gray-300" >
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            {tHead.map((fill, index) => (
                                <th 
                                    key={index}
                                    className={`border border-gray-300 ${fill === "No." || fill === "Aksi" ? 'px-2 py-1' : 'px-4 py-2'}`}
                                >
                                    {fill}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                            {data.map((inv, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-2 py-1">{index + 1}.</td>
                                    <td className="border border-gray-300 px-4 py-2">{inv.nama_barang}</td>
                                    <td className="border border-gray-300 px-4 py-2">{inv.kategori_barang}</td>
                                    <td className="border border-gray-300 px-4 py-2">{inv.jumlah_barang}</td>
                                    <td className="border border-gray-300 px-4 py-2">{setIdr(inv.harga_per_unit*inv.jumlah_barang)}</td>
                                    <td className="border border-gray-300 px-4 py-2">{sliceDate(inv.tanggal_masuk)}</td>
                                    <td className="border border-gray-300 px-4 py-1">
                                        <EditButton onClick={() => handleEdit(inv.id)}/>
                                        <RemoveButton onClick={() => handleDelete(inv.id)}/>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;