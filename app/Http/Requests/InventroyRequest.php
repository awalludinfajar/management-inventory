<?php

namespace App\Http\Requests;

use App\KategoriBarang;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class InventroyRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_barang' => 'required|string',
            'kategori_barang' => ['required', new Enum(KategoriBarang::class)],
            'jumlah_barang' => 'required|numeric|min:1',
            'harga_per_unit' => 'required|numeric|min:100',
            'tanggal_masuk' => 'required|date_format:Y-m-d'
        ];
    }

    public function messages(): array
    {
        return [
            'nama_barang.required' => 'Nama Barang tidak boleh kosong!',
            'nama_barang.string' => 'Nama barang harus bertipe String',
            'kategori_barang.required' => 'Kategori barang harus di isi',
            'kategori_barang.Enum' => 'Kategori barang Invalid',
            'jumlah_barang.required' => 'Jumlah barang tidak boleh kosong!',
            'jumlah_barang.numeric' => 'Jumlah barang harus bertipe numeric',
            'jumlah_barang.min' => 'Jumlah barang tidak boleh kurang dari 1',
            'harga_per_unit.required' => 'Harga tidak boleh kosong!',
            'harga_per_unit.numeric' => 'Harga barang harus bertipe numeric',
            'harga_per_unit.min' => 'Harga Barang tidak boleh kurang dari 100 rupiah',
            'tanggal_masuk.required' => 'Tanggal masuk tidak boleh kosong',
            'tanggal_masuk.date_format' => 'Tanggal masuk harus ber format Y-M-D',
        ];
    }
}
