<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseProduct extends Model
{
    use HasFactory;

    protected $primaryKey = 'purchase_product_id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'purchase_product_id',
        'product_id',
        'product_name',
        'product_sku',
        'product_image_path',
        'qty',
        'buy_price',
        'total'
    ];
}
