<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PricingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pricings = [
            ['id' => \Ramsey\Uuid\Uuid::uuid7()->toString(), 'name' => 'standart', 'quota_id' => 1, 'price' => 0],
        ];

        DB::table('pricings')->insert($pricings);
    }
}
