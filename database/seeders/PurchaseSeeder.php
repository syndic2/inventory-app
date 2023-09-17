<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use App\Models\Purchase;

class PurchaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seeds = [
            [
                'purchase_id' =>  Str::uuid()->toString(),
                'purchase_date_time' => Carbon::now()->format('Y-m-d H:i:s'),
                'supplier_name' => 'Supplier 1',
                'total_product' => 5,
                'total_qty' => 25,
                'grand_total' => 100000,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'purchase_id' =>  Str::uuid()->toString(),
                'purchase_date_time' => Carbon::now()->format('Y-m-d H:i:s'),
                'supplier_name' => 'Supplier 2',
                'total_product' => 5,
                'total_qty' => 25,
                'grand_total' => 200000,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'purchase_id' =>  Str::uuid()->toString(),
                'purchase_date_time' => Carbon::now()->format('Y-m-d H:i:s'),
                'supplier_name' => 'Supplier 3',
                'total_product' => 5,
                'total_qty' => 25,
                'grand_total' => 300000,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'purchase_id' =>  Str::uuid()->toString(),
                'purchase_date_time' => Carbon::now()->format('Y-m-d H:i:s'),
                'supplier_name' => 'Supplier 4',
                'total_product' => 5,
                'total_qty' => 25,
                'grand_total' => 400000,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'purchase_id' =>  Str::uuid()->toString(),
                'purchase_date_time' => Carbon::now()->format('Y-m-d H:i:s'),
                'supplier_name' => 'Supplier 5',
                'total_product' => 5,
                'total_qty' => 25,
                'grand_total' => 500000,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]
        ];

        Purchase::insert($seeds);
    }
}
