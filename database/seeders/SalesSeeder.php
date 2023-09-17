<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use App\Models\Sales;

class SalesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seeds = [
            [
                'sale_id' =>  Str::uuid()->toString(),
                'sale_date_time' => Carbon::now()->format('Y-m-d H:i:s'),
                'buyer_name' => 'Buyer 1',
                'total_product' => 5,
                'total_qty' => 25,
                'grand_total' => 100000,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'sale_id' =>  Str::uuid()->toString(),
                'sale_date_time' => Carbon::now()->format('Y-m-d H:i:s'),
                'buyer_name' => 'Buyer 2',
                'total_product' => 5,
                'total_qty' => 25,
                'grand_total' => 200000,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'sale_id' =>  Str::uuid()->toString(),
                'sale_date_time' => Carbon::now()->format('Y-m-d H:i:s'),
                'buyer_name' => 'Buyer 3',
                'total_product' => 5,
                'total_qty' => 25,
                'grand_total' => 300000,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'sale_id' =>  Str::uuid()->toString(),
                'sale_date_time' => Carbon::now()->format('Y-m-d H:i:s'),
                'buyer_name' => 'Buyer 4',
                'total_product' => 5,
                'total_qty' => 25,
                'grand_total' => 400000,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'sale_id' =>  Str::uuid()->toString(),
                'sale_date_time' => Carbon::now()->format('Y-m-d H:i:s'),
                'buyer_name' => 'Buyer 5',
                'total_product' => 5,
                'total_qty' => 25,
                'grand_total' => 500000,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]
        ];

        Sales::insert($seeds);
    }
}
