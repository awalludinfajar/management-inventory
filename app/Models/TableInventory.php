<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TableInventory extends Model
{
    use HasFactory;

    protected $fillable = [
        "nama_barang",
        "kategori_barang",
        "jumlah_barang",
        "harga_per_unit",
        "tanggal_masuk"
    ];
}
