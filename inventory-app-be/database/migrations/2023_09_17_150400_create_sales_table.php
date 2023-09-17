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
        Schema::create('sales', function (Blueprint $table) {
            $table->uuid('sale_id')->primary();
            $table->dateTime('sale_date_time');
            $table->text('sale_note')->nullable();
            $table->text('sale_invoice_image_path')->nullable();
            $table->string('buyer_name');
            $table->integer('total_product');
            $table->integer('total_qty');
            $table->integer('grand_total');
            $table->uuid('created_by');
            $table->uuid('updated_by');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
