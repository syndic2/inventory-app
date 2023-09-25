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
        Schema::create('purchase_products', function (Blueprint $table) {
            $table->uuid('purchase_product_id')->primary();
            $table->uuid('purchase_id');
            $table->uuid('product_id');
            $table->string('product_name');
            $table->string('product_sku');
            $table->string('product_image_path')->nullable();
            $table->integer('qty');
            $table->float('buy_price');
            $table->float('total');
            $table->uuid('created_by');
            $table->uuid('updated_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_products');
    }
};
