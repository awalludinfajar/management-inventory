<?php

namespace App\Exports;

use App\Models\TableInventory;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class InventoriesExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return TableInventory::all([
            'nama_barang',
            'kategori_barang',
            'jumlah_barang',
            'harga_per_unit',
            'tanggal_masuk',
        ]);
    }

    public function headings(): array
    {
        return [
            'Nama Barang',
            'Kategori Barang',
            'Jumlah Barang',
            'Harga Per Unit',
            'Tanggal Masuk',
        ];
    }
}
