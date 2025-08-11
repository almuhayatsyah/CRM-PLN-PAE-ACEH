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
        Schema::table('feedbacks', function (Blueprint $table) {
            // Menambahkan kolom status setelah kolom 'komentar'
            $table->string('status')->after('komentar')->default('Diterima');
            // Menambahkan kolom catatan tindak lanjut setelah kolom 'status'
            $table->text('catatan_tindak_lanjut')->after('status')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('feedbacks', function (Blueprint $table) {
            $table->dropColumn(['status', 'catatan_tindak_lanjut']);
        });
    }
};
