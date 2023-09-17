<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'product_id';
    protected $keyType = 'string';

    protected $fillable = [
        'product_id',
        'product_name',
        'product_sku',
        'product_desc',
        'product_image_path',
        'qty',
        'buy_price',
        'sell_price'
    ];
}
