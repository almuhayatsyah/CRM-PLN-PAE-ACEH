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
        Schema::table('users', function (Blueprint $table) {
            // Menambahkan kolom pelanggan_id setelah kolom 'id'
            // Kolom ini bisa null karena Admin, Manajer, dan Staff tidak memiliki relasi ke pelanggan
            $table->foreignId('pelanggan_id')->nullable()->after('id')->constrained('pelanggans')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Menghapus foreign key constraint terlebih dahulu
            $table->dropForeign(['pelanggan_id']);
            // Menghapus kolomnya
            $table->dropColumn('pelanggan_id');
        });
    }
};
