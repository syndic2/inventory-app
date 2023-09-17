<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seeds = [
            [
                'user_id' => "91bf4ae0-6a8a-435c-a97c-1b796a79f4de",
                'name' => 'Jonathan',
                'email' => 'jonathan123@mail.com',
                'username' => 'jonsu',
                'password' => Hash::make('jonsu123'),
                'remember_token' => null,
                'email_verified_at' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'deleted_at' => null
            ],
            [
                'user_id' => "8f218345-0915-4178-a260-75bbd415096e",
                'name' => 'Helena',
                'email' => 'helena123@mail.com',
                'username' => 'helena',
                'password' => Hash::make('helena123'),
                'remember_token' => null,
                'email_verified_at' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'deleted_at' => null
            ]
        ];

        User::insert($seeds);
    }
}
