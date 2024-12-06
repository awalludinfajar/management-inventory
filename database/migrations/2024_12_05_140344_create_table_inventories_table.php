<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('table_inventories', function (Blueprint $table) {
            $table->id();
            $table->string("nama_barang");
            $table->enum("kategori_barang", ["Elektronik", "Pakaian", "Makanan", "Lainnya"]);
            $table->integer("jumlah_barang");
            $table->decimal('harga_per_unit', 15, 2);
            $table->datetime("tanggal_masuk");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_inventories');
    }
};
