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
        Schema::create('pelanggans', function (Blueprint $table) {
            // Menambahkan pengaturan eksplisit
            $table->engine = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';

            $table->id();
            $table->string('id_pel')->unique();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('kode_pln')->nullable();
            $table->string('nama_perusahaan');
            $table->string('nama');
            $table->string('kontak');
            $table->decimal('kapasitas_daya', 10, 2);
            $table->string('sektor');
            $table->string('peruntukan');
            $table->string('up3');
            $table->string('ulp');
            $table->string('kriteria_prioritas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelanggans');
    }
};
