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
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('product_id')->primary();
            $table->string('product_name');
            $table->string('product_sku');
            $table->string('product_desc');
            $table->string('product_image_path')->nullable();
            $table->integer('qty');
            $table->integer('buy_price');
            $table->integer('sell_price');
            $table->uuid('created_by');
            $table->uuid('updated_by');
            $table->uuid('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
