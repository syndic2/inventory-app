<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seeds = [
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 1',
                'product_sku' => 'Product SKU 1',
                'product_desc' => 'This is product seed 1',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 2',
                'product_sku' => 'Product SKU 2',
                'product_desc' => 'This is product seed 2',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 3',
                'product_sku' => 'Product SKU 3',
                'product_desc' => 'This is product seed 3',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 4',
                'product_sku' => 'Product SKU 4',
                'product_desc' => 'This is product seed 4',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 5',
                'product_sku' => 'Product SKU 5',
                'product_desc' => 'This is product seed 5',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 6',
                'product_sku' => 'Product SKU 6',
                'product_desc' => 'This is product seed 6',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 7',
                'product_sku' => 'Product SKU 7',
                'product_desc' => 'This is product seed 7',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 8',
                'product_sku' => 'Product SKU 8',
                'product_desc' => 'This is product seed 8',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 9',
                'product_sku' => 'Product SKU 9',
                'product_desc' => 'This is product seed 9',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 10',
                'product_sku' => 'Product SKU 10',
                'product_desc' => 'This is product seed 10',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 11',
                'product_sku' => 'Product SKU 11',
                'product_desc' => 'This is product seed 11',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 12',
                'product_sku' => 'Product SKU 12',
                'product_desc' => 'This is product seed 12',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 13',
                'product_sku' => 'Product SKU 13',
                'product_desc' => 'This is product seed 13',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 14',
                'product_sku' => 'Product SKU 14',
                'product_desc' => 'This is product seed 14',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 15',
                'product_sku' => 'Product SKU 15',
                'product_desc' => 'This is product seed 15',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 16',
                'product_sku' => 'Product SKU 16',
                'product_desc' => 'This is product seed 16',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 17',
                'product_sku' => 'Product SKU 17',
                'product_desc' => 'This is product seed 17',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 18',
                'product_sku' => 'Product SKU 18',
                'product_desc' => 'This is product seed 18',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 19',
                'product_sku' => 'Product SKU 19',
                'product_desc' => 'This is product seed 19',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'product_id' => Str::uuid()->toString(),
                'product_name' => 'Product Seed 20',
                'product_sku' => 'Product SKU 20',
                'product_desc' => 'This is product seed 20',
                'qty' => 100,
                'buy_price' => 0,
                'sell_price' => 0,
                'created_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_by' => '91bf4ae0-6a8a-435c-a97c-1b796a79f4de',
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]
        ];

        Product::insert($seeds);
    }
}
