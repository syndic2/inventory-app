<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Purchase extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'purchase_id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'purchase_id',
        'purchase_date_time',
        'purchase_note',
        'purchase_invoice_image_path',
        'supplier_name',
        'total_product',
        'total_qty',
        'grand_total'
    ];
}
