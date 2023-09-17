<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sales extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'sales_id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'sales_id',
        'sales_date_time',
        'sales_note',
        'sales_invoice_image_path',
        'buyer_name',
        'total_product',
        'total_qty',
        'grand_total'
    ];
}
