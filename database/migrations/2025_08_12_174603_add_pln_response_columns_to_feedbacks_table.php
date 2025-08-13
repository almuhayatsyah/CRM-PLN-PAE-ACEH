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
            $table->text('tanggapan_pln')->nullable()->after('catatan_tindak_lanjut');
            $table->string('responder')->nullable()->after('tanggapan_pln');
            $table->timestamp('tanggal_tanggapan')->nullable()->after('responder');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('feedbacks', function (Blueprint $table) {
            $table->dropColumn(['tanggapan_pln', 'responder', 'tanggal_tanggapan']);
        });
    }
};
