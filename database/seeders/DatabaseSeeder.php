<?php

namespace Database\Seeders;

use App\Models\ItemParam;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call(RoleSeeder::class);
        $this->call(PricingSeeder::class);
        $this->call(ItemSeeder::class);
        $this->call(ItemParamSeeder::class);

        User::factory()->create([
            'id' => \Ramsey\Uuid\Uuid::uuid7()->toString(),
            'email' => 'test@example.com',
        ]);
    }
}
