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
        Schema::create('pemakaian_dayas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pelanggan_id')->constrained('pelanggans')->onDelete('cascade');
            $table->string('bulan_tahun'); // Format: 'YYYY-MM'
            $table->decimal('pemakaian_kwh', 12, 2);
            $table->decimal('beban_puncak', 10, 2)->nullable(); // Menyesuaikan ERD
            $table->boolean('flag_anomali')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemakaian_dayas');
    }
};
